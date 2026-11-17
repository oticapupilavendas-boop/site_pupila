"""Build the unbranded Wayfarer GLB with Python's standard library."""

import json
import math
from pathlib import Path
import struct


def subtract(a, b):
    return tuple(x - y for x, y in zip(a, b))


def cross(a, b):
    return (a[1]*b[2] - a[2]*b[1], a[2]*b[0] - a[0]*b[2], a[0]*b[1] - a[1]*b[0])


def unit(v):
    length = math.hypot(*v)
    return tuple(x / length for x in v)


def mix(a, b, t):
    return tuple(x + (y - x)*t for x, y in zip(a, b))


def cubic(a, b, c, d, t):
    return mix(mix(mix(a, b, t), mix(b, c, t), t), mix(mix(b, c, t), mix(c, d, t), t), t)


class Mesh:
    def __init__(self):
        self.points = []
        self.lookup = {}
        self.indices = []

    def vertex(self, p):
        key = tuple(round(v, 5) for v in p)
        if key not in self.lookup:
            self.lookup[key] = len(self.points)
            self.points.append(p)
        return self.lookup[key]

    def triangle(self, a, b, c, flip=False):
        indices = [self.vertex(p) for p in (a, b, c)]
        if len(set(indices)) == 3:
            self.indices.extend(indices[::-1] if flip else indices)

    def strip(self, a, b, flip=False, closed=True):
        for i in range(len(a) if closed else len(a) - 1):
            j = (i + 1) % len(a)
            self.triangle(a[i], a[j], b[j], flip)
            self.triangle(a[i], b[j], b[i], flip)

    def normals(self):
        normals = [[0.0, 0.0, 0.0] for _ in self.points]
        for i in range(0, len(self.indices), 3):
            face = self.indices[i:i + 3]
            a, b, c = (self.points[j] for j in face)
            normal = unit(cross(subtract(b, a), subtract(c, a)))
            for k, j in enumerate(face):
                u = unit(subtract(self.points[face[k - 1]], self.points[j]))
                v = unit(subtract(self.points[face[(k + 1) % 3]], self.points[j]))
                angle = math.atan2(math.hypot(*cross(u, v)), sum(x*y for x, y in zip(u, v)))
                for axis in range(3):
                    normals[j][axis] += normal[axis]*angle
        return [unit(v) for v in normals]


# Cubic outlines traced against the right half of the frontal reference, in pixels.
# The last outer arc runs down the symmetry plane, through the bridge.
OUTSIDE = [
    ((360, 143), (382, 143), (401, 133), (431, 126)),
    ((431, 126), (464, 118), (492, 118), (518, 119)),
    ((518, 119), (543, 119), (569, 121), (584, 123)),
    ((584, 123), (600, 124), (611, 124), (611, 132)),
    ((611, 132), (611, 143), (611, 153), (607, 161)),
    ((607, 161), (603, 165), (595, 166), (592, 174)),
    ((592, 174), (583, 196), (582, 220), (573, 241)),
    ((573, 241), (567, 256), (560, 263), (549, 267)),
    ((549, 267), (532, 276), (506, 280), (488, 280)),
    ((488, 280), (462, 280), (444, 275), (432, 268)),
    ((432, 268), (419, 260), (408, 252), (399, 238)),
    ((399, 238), (389, 223), (385, 207), (383, 199)),
    ((383, 199), (379, 188), (377, 181), (373, 177)),
    ((373, 177), (369, 173), (364, 172), (360, 172)),
    ((360, 172), (360, 162), (360, 152), (360, 143)),
]

INSIDE = [
    ((411, 146), (421, 139), (441, 135), (458, 132)),
    ((458, 132), (483, 127), (510, 126), (529, 127)),
    ((529, 127), (542, 128), (551, 130), (557, 134)),
    ((557, 134), (564, 138), (568, 143), (571, 151)),
    ((571, 151), (574, 158), (574, 169), (573, 177)),
    ((573, 177), (573, 188), (571, 198), (569, 208)),
    ((569, 208), (567, 222), (563, 233), (557, 243)),
    ((557, 243), (551, 252), (546, 257), (537, 260)),
    ((537, 260), (524, 265), (506, 269), (487, 269)),
    ((487, 269), (466, 269), (451, 266), (439, 260)),
    ((439, 260), (426, 253), (417, 245), (410, 232)),
    ((410, 232), (404, 220), (401, 208), (400, 196)),
    ((400, 196), (398, 185), (398, 175), (399, 168)),
    ((399, 168), (399, 162), (401, 156), (405, 152)),
    ((405, 152), (406, 150), (408, 148), (411, 146)),
]

SAMPLES = (6, 6, 4, 4, 4, 4, 6, 5, 6, 6, 6, 5, 4, 5, 4)


def trace(outline):
    scale = 145 / 502
    return [((x - 360)*scale, (157.5 - y)*scale)
            for curve, count in zip(outline, SAMPLES)
            for i in range(count) for x, y in [cubic(*curve, i/count)]]


def frame_depth(x, y):
    return -7.2*(x / 72.5)**2 + 0.11*y


def outline_offset(points, i, amount, seam=None):
    x, y = points[i]
    if seam is not None:
        if i >= seam:
            return (0, y + amount*(1 - 2*(i - seam)/(len(points) - seam)))
        if i == 0:
            return (0, y - amount)
    dx, dy = unit(subtract(points[(i + 1) % len(points)], points[i - 1]))
    return (x + amount*dy, y - amount*dx)


def make_front(frame, lenses):
    outside, inside = trace(OUTSIDE), trace(INSIDE)
    seam = sum(SAMPLES[:-1])
    center = (36, -13)

    for side in (1, -1):
        def rim_ring(points, inset, depth, inner=False, back=False):
            ring = []
            for i in range(len(points)):
                x, y = outline_offset(points, i, inset, None if inner else seam)
                # The nose contact surfaces thicken towards the back of the rims.
                pad = 2.8*math.exp(-((x - 12)/6)**2 - ((y + 15)/10)**2) if back else 0
                ring.append((side*x, y, frame_depth(x, y) + depth - pad))
            return ring

        outer_front = rim_ring(outside, 0.65, 2.55)
        outer_back = rim_ring(outside, 0.70, -2.55, back=True)
        inner_back = rim_ring(inside, -0.55, -2.55, inner=True, back=True)
        inner_front = rim_ring(inside, -0.50, 2.55, inner=True)
        flip = side == 1
        frame.strip(outer_front, inner_front, flip)
        frame.strip(outer_back, inner_back, not flip)

        outer_wall = [outer_front, rim_ring(outside, 0.15, 2.28), rim_ring(outside, 0, 1.78),
                      rim_ring(outside, 0, -1.78, back=True), rim_ring(outside, 0.15, -2.25, back=True), outer_back]
        inner_wall = [inner_front, rim_ring(inside, 0, 1.94, inner=True),
                      rim_ring(inside, 0, -1.94, inner=True, back=True), inner_back]
        for a, b in zip(outer_wall, outer_wall[1:]):
            frame.strip(a[:seam + 1], b[:seam + 1], not flip, closed=False)
        for a, b in zip(inner_wall, inner_wall[1:]):
            frame.strip(a, b, flip)

        def lens_ring(radius, depth):
            result = []
            for i in range(len(inside)):
                edge = outline_offset(inside, i, -0.13)
                x, y = mix(center, edge, radius)
                z = frame_depth(x, y) + 2.3*(1 - radius**2) + depth
                result.append((side*x, y, z))
            return result

        for depth, reverse in ((0.85, not flip), (-0.85, flip)):
            rings = [lens_ring(radius, depth) for radius in (0, 0.33, 0.66, 0.975, 1)]
            for a, b in zip(rings, rings[1:]):
                lenses.strip(a, b, reverse)
        lenses.strip(lens_ring(1, 0.85), lens_ring(1, -0.85), not flip)


def sweep(mesh, stations, side):
    rings = []
    for i, (x, y, z, width, height) in enumerate(stations):
        previous = stations[max(0, i - 1)]
        following = stations[min(i + 1, len(stations) - 1)]
        tangent = unit(subtract(following[:3], previous[:3]))
        across = unit(cross(tangent, (0, 1, 0)))
        up = cross(across, tangent)
        ring = []
        for j in range(16):
            angle = 2*math.pi*(j + 0.5)/16
            u, v = math.cos(angle), math.sin(angle)
            offsets = (math.copysign(abs(u)**0.48, u)*width/2, math.copysign(abs(v)**0.48, v)*height/2)
            dx, dy, dz = [a*offsets[0] + b*offsets[1] for a, b in zip(across, up)]
            ring.append((side*(x + dx), y + dy, z + dz))
        rings.append(ring)
    for a, b in zip(rings, rings[1:]):
        mesh.strip(a, b, side > 0)
    for ring, flip in ((rings[0], side < 0), (rings[-1], side > 0)):
        center = tuple(sum(values)/len(ring) for values in zip(*ring))
        for i, point in enumerate(ring):
            mesh.triangle(center, point, ring[(i + 1) % len(ring)], flip)


def make_temples(frame, metal):
    # x/y/z and section width/height in mm. The ear tips curl down and inwards.
    stations = [(69, 3.0, -7.9, 4.4, 8.4), (69.6, 3.0, -10.7, 4.8, 9.5),
                (70.0, 2.8, -15, 4.9, 9.4), (70.0, 2.2, -26, 4.8, 9.3),
                (69.9, 1.0, -43, 4.4, 8.7), (69.4, -0.5, -64, 4.0, 7.9),
                (68.6, -1.9, -83, 3.8, 7.0), (67.8, -2.7, -98, 3.7, 6.0),
                (67.0, -3.5, -106, 3.7, 5.0), (65.9, -5.0, -113, 3.9, 4.6),
                (64.4, -7.5, -119, 4.1, 4.8), (62.5, -11, -125, 4.5, 5.5),
                (60.2, -16.0, -131, 4.7, 6.2), (57.4, -22.0, -137, 4.5, 6.6),
                (55.8, -25.7, -140.0, 4.1, 5.6), (55.3, -27, -141.1, 3.1, 4.3),
                (55.1, -27.5, -141.6, 1.5, 2.0)]
    for side in (1, -1):
        sweep(frame, stations, side)
        sweep(metal, [(66.9, 3.2, -10.0, 1.8, 4.4), (66.6, 3.2, -10.8, 2.0, 5.0),
                      (66.6, 3.2, -15.4, 2.0, 5.0), (66.9, 3.2, -16.2, 1.8, 4.4)], side)
        x, y = 66.5, 2.7
        z = frame_depth(x, y) + 2.47
        sweep(metal, [(x, y, z + 0.5, 1.9, 0.65), (x, y, z + 0.34, 2.9, 1.12),
                      (x, y, z - 0.15, 3.1, 1.24), (x, y, z - 0.55, 2.6, 1.0)], side)


def write_glb(path):
    frame, lenses, metal = Mesh(), Mesh(), Mesh()
    make_front(frame, lenses)
    make_temples(frame, metal)
    binary = bytearray()
    accessors, views = [], []

    def accessor(values, fmt, kind, target, bounds=False):
        offset = len(binary)
        data = b''.join(struct.pack('<' + fmt, *v) for v in values)
        binary.extend(data)
        size = len(binary) - offset
        binary.extend(bytes(-size % 4))
        views.append(dict(buffer=0, byteOffset=offset, byteLength=size, target=target))
        entry = dict(bufferView=len(views) - 1, componentType=5126 if fmt == '3f' else 5123,
                     count=len(values), type=kind)
        if bounds:
            axes = tuple(zip(*struct.iter_unpack('<' + fmt, data)))
            entry.update(min=list(map(min, axes)), max=list(map(max, axes)))
        accessors.append(entry)
        return len(accessors) - 1

    primitives = []
    # Normalize the traced width to the requested physical size and export in meters.
    half_width = max(x for x, _, _ in frame.points)
    for i, mesh in enumerate((frame, lenses, metal)):
        mesh.points = [(x*72.5/half_width, y, z) for x, y, z in mesh.points]
        positions = [tuple(v/1000 for v in point) for point in mesh.points]
        primitives.append(dict(attributes=dict(POSITION=accessor(positions, '3f', 'VEC3', 34962, True),
                                              NORMAL=accessor(mesh.normals(), '3f', 'VEC3', 34962)),
                               indices=accessor([(j,) for j in mesh.indices], 'H', 'SCALAR', 34963), material=i))

    materials = [
        dict(name='Black acetate', pbrMetallicRoughness=dict(baseColorFactor=[0.012, 0.013, 0.015, 1],
                                                          metallicFactor=0, roughnessFactor=0.24)),
        dict(name='Smoke lenses', pbrMetallicRoughness=dict(baseColorFactor=[0.021, 0.032, 0.029, 1],
                                                         metallicFactor=0, roughnessFactor=0.16)),
        dict(name='Brushed metal', pbrMetallicRoughness=dict(baseColorFactor=[0.27, 0.28, 0.30, 1],
                                                          metallicFactor=0.78, roughnessFactor=0.33)),
    ]
    doc = dict(asset=dict(version='2.0', generator='Pupila Wayfarer model builder'), scene=0,
               scenes=[dict(nodes=[0])], nodes=[dict(name='Bridge pivot', mesh=0)],
               meshes=[dict(primitives=primitives)], materials=materials, accessors=accessors,
               bufferViews=views, buffers=[dict(byteLength=len(binary))])
    payload = json.dumps(doc, separators=(',', ':')).encode()
    payload += b' ' * (-len(payload) % 4)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(struct.pack('<4sII', b'glTF', 2, 28 + len(payload) + len(binary))
                     + struct.pack('<I4s', len(payload), b'JSON') + payload
                     + struct.pack('<I4s', len(binary), b'BIN\0') + binary)
    print(f'{path.name}: {path.stat().st_size} bytes, {sum(len(m.indices) for m in (frame, lenses, metal))//3} triangles')


if __name__ == '__main__':
    write_glb(Path(__file__).resolve().parents[1] / 'assets/models/wayfarer-prototype.glb')
