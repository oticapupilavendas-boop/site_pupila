// Local viewer for the indexed, untransformed glTF mesh produced by the builder.
const modelUrl = '../../../assets/models/wayfarer-prototype.glb';
const canvas = document.querySelector('canvas');
const marker = document.querySelector('.pivot');
const status = document.querySelector('#status');
const buttons = [...document.querySelectorAll('[data-view]')];
const pivotButton = document.querySelector('#show-pivot');
const views = {
  front: [0, 0, 'Frontal'],
  side: [Math.PI / 2, 0, 'Lateral direita'],
  back: [Math.PI, 0, 'Traseira'],
  quarter: [0.66, 0.29, 'Três quartos'],
};

async function loadModel() {
  const response = await fetch(modelUrl);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const file = await response.arrayBuffer();
  const header = new DataView(file);
  if (header.getUint32(0, true) !== 0x46546c67 || header.getUint32(4, true) !== 2) {
    throw new Error('Formato GLB 2.0 esperado');
  }
  const jsonLength = header.getUint32(12, true);
  const model = JSON.parse(new TextDecoder().decode(new Uint8Array(file, 20, jsonLength)));
  const node = model.nodes[model.scenes[model.scene].nodes[0]];
  if (node.matrix || node.translation || node.rotation || node.scale) throw new Error('Transformação inesperada na raiz');

  function read(id, Type, components) {
    const accessor = model.accessors[id];
    const view = model.bufferViews[accessor.bufferView];
    return new Type(file, 28 + jsonLength + view.byteOffset + (accessor.byteOffset ?? 0), accessor.count * components);
  }

  const primitives = model.meshes[node.mesh].primitives.map(({ attributes, indices, material }) => ({
    positions: read(attributes.POSITION, Float32Array, 3),
    normals: read(attributes.NORMAL, Float32Array, 3),
    indices: read(indices, Uint16Array, 1),
    material: model.materials[material].pbrMetallicRoughness,
  }));
  const bounds = model.accessors[model.meshes[node.mesh].primitives[0].attributes.POSITION];
  const format = new Intl.NumberFormat('pt-BR');
  document.querySelector('#size').textContent = `${format.format(file.byteLength)} bytes`;
  document.querySelector('#triangles').textContent = format.format(primitives.reduce((n, p) => n + p.indices.length / 3, 0));
  document.querySelector('#width').textContent = `${format.format(Math.round(1000 * (bounds.max[0] - bounds.min[0])))} mm`;
  return primitives;
}

function makeRenderer(primitives) {
  const gl = canvas.getContext('webgl', { antialias: true, alpha: true });
  if (!gl) throw new Error('WebGL indisponível');
  const program = gl.createProgram();
  const shaders = [[gl.VERTEX_SHADER, `
    attribute vec3 position;
    attribute vec3 normal;
    uniform mat3 camera;
    uniform vec2 center;
    uniform vec2 extent;
    varying vec3 surfaceNormal;
    void main() {
      vec3 point = camera * position;
      surfaceNormal = camera * normal;
      gl_Position = vec4((point.xy - center) / extent, -point.z * 4.0, 1.0);
    }
  `], [gl.FRAGMENT_SHADER, `
    precision mediump float;
    varying vec3 surfaceNormal;
    uniform vec3 color;
    uniform float roughness;
    uniform float metal;
    void main() {
      vec3 n = normalize(surfaceNormal);
      vec3 view = vec3(0.0, 0.0, 1.0);
      vec3 reflected = reflect(-view, n);
      float overhead = max(dot(n, normalize(vec3(-0.4, 0.85, 0.7))), 0.0);
      float fill = max(dot(n, normalize(vec3(0.9, 0.1, 0.7))), 0.0);
      float exponent = mix(38.0, 9.0, roughness);
      float softbox = pow(max(dot(reflected, normalize(vec3(-0.46, 0.87, 0.58))), 0.0), exponent);
      float rim = pow(max(dot(reflected, normalize(vec3(0.92, 0.4, 0.35))), 0.0), exponent);
      float fresnel = 0.025 + 0.2 * pow(1.0 - max(n.z, 0.0), 4.0);
      vec3 spec = mix(vec3(1.0), color * 2.6, metal);
      vec3 light = color * (0.47 + overhead * 0.61 + fill * 0.22)
        + spec * (fresnel * 0.23 + softbox * 0.15 + rim * 0.09);
      gl_FragColor = vec4(pow(light, vec3(1.0 / 2.2)), 1.0);
    }
  `]];
  for (const [type, source] of shaders) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
  gl.useProgram(program);
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);

  const uniforms = Object.fromEntries(['camera', 'center', 'extent', 'color', 'roughness', 'metal']
    .map(name => [name, gl.getUniformLocation(program, name)]));
  const position = gl.getAttribLocation(program, 'position');
  const normal = gl.getAttribLocation(program, 'normal');
  gl.enableVertexAttribArray(position);
  gl.enableVertexAttribArray(normal);

  function buffer(target, data) {
    const handle = gl.createBuffer();
    gl.bindBuffer(target, handle);
    gl.bufferData(target, data, gl.STATIC_DRAW);
    return handle;
  }

  const parts = primitives.map(part => ({
    ...part,
    positionBuffer: buffer(gl.ARRAY_BUFFER, part.positions),
    normalBuffer: buffer(gl.ARRAY_BUFFER, part.normals),
    indexBuffer: buffer(gl.ELEMENT_ARRAY_BUFFER, part.indices),
  }));

  return function render(yaw, pitch) {
    const scale = Math.min(devicePixelRatio, 2);
    canvas.width = Math.round(canvas.clientWidth * scale);
    canvas.height = Math.round(canvas.clientHeight * scale);
    const aspect = canvas.width / canvas.height;
    const c = Math.cos(yaw), s = Math.sin(yaw), p = Math.cos(pitch), q = Math.sin(pitch);
    const camera = [c, -s*q, s*p, 0, p, q, -s, -c*q, c*p];
    const lower = [Infinity, Infinity], upper = [-Infinity, -Infinity];
    for (const { positions } of parts) {
      for (let i = 0; i < positions.length; i += 3) {
        for (let axis = 0; axis < 2; axis++) {
          const value = camera[axis]*positions[i] + camera[axis + 3]*positions[i + 1] + camera[axis + 6]*positions[i + 2];
          lower[axis] = Math.min(lower[axis], value);
          upper[axis] = Math.max(upper[axis], value);
        }
      }
    }
    const center = lower.map((min, i) => (min + upper[i]) / 2);
    const halfHeight = Math.max((upper[0] - lower[0]) / aspect, upper[1] - lower[1]) * 0.64;
    const halfWidth = halfHeight * aspect;
    marker.style.left = `${50 * (1 - center[0] / halfWidth)}%`;
    marker.style.top = `${50 * (1 + center[1] / halfHeight)}%`;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.uniformMatrix3fv(uniforms.camera, false, camera);
    gl.uniform2fv(uniforms.center, center);
    gl.uniform2f(uniforms.extent, halfWidth, halfHeight);
    for (const part of parts) {
      gl.bindBuffer(gl.ARRAY_BUFFER, part.positionBuffer);
      gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, part.normalBuffer);
      gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, part.indexBuffer);
      gl.uniform3fv(uniforms.color, part.material.baseColorFactor.slice(0, 3));
      gl.uniform1f(uniforms.roughness, part.material.roughnessFactor);
      gl.uniform1f(uniforms.metal, part.material.metallicFactor);
      gl.drawElements(gl.TRIANGLES, part.indices.length, gl.UNSIGNED_SHORT, 0);
    }
  };
}

try {
  const render = makeRenderer(await loadModel());
  let view = 'front';
  function draw() {
    const [yaw, pitch, label] = views[view];
    render(yaw, pitch);
    status.textContent = `Vista ${label.toLowerCase()}. ${marker.hidden ? 'Pivô oculto.' : 'O ponto rosa marca o pivô.'}`;
  }
  marker.hidden = false;
  draw();
  for (const button of buttons) {
    button.disabled = false;
    button.addEventListener('click', () => {
      view = button.dataset.view;
      for (const option of buttons) option.setAttribute('aria-pressed', String(option === button));
      draw();
    });
  }
  pivotButton.disabled = false;
  pivotButton.addEventListener('click', () => {
    marker.hidden = !marker.hidden;
    pivotButton.setAttribute('aria-pressed', String(!marker.hidden));
    draw();
  });
  new ResizeObserver(draw).observe(canvas);
} catch (error) {
  status.textContent = `Não foi possível exibir o modelo. ${error.message}.`;
}
