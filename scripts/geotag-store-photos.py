"""Add the store's public map coordinates to its WebP photos without re-encoding pixels."""

from pathlib import Path
from struct import pack, unpack_from

ROOT = Path(__file__).resolve().parents[1]
LATITUDE = -26.3056482
LONGITUDE = -48.8445055
PHOTOS = [
    *ROOT.joinpath("assets").glob("image-02*.webp"),  # facade
    *ROOT.joinpath("assets").glob("image-03*.webp"),  # facade
    *ROOT.joinpath("assets").glob("image-04*.webp"),  # interior
    *(ROOT / "assets" / f"image-0{number}.webp" for number in range(5, 8)),  # interior
]


def coordinate(value):
    absolute = abs(value)
    degrees = int(absolute)
    minutes = int((absolute - degrees) * 60)
    seconds = round(((absolute - degrees) * 60 - minutes) * 60 * 1_000_000)
    return b"".join(pack("<II", numerator, denominator) for numerator, denominator in
                    [(degrees, 1), (minutes, 1), (seconds, 1_000_000)])


def exif_gps():
    # TIFF IFD0 points to a GPS IFD; its rational values use WGS-84 coordinates.
    lat, lon = coordinate(LATITUDE), coordinate(LONGITUDE)
    tiff = bytearray(b"II*\x00" + pack("<I", 8))
    tiff += pack("<H", 1) + pack("<HHII", 0x8825, 4, 1, 26) + pack("<I", 0)
    tiff += pack("<H", 4)
    tiff += pack("<HHI4s", 1, 2, 2, b"S\x00\x00\x00")
    tiff += pack("<HHII", 2, 5, 3, 80)
    tiff += pack("<HHI4s", 3, 2, 2, b"W\x00\x00\x00")
    tiff += pack("<HHII", 4, 5, 3, 104)
    tiff += pack("<I", 0) + lat + lon
    return b"Exif\x00\x00" + tiff


def chunk(name, payload):
    return name + pack("<I", len(payload)) + payload + (b"\x00" if len(payload) & 1 else b"")


gps_chunk = chunk(b"EXIF", exif_gps())
for photo in PHOTOS:
    data = photo.read_bytes()
    if data[:4] != b"RIFF" or data[8:12] != b"WEBP":
        raise ValueError(f"Unexpected WebP format: {photo}")
    if data[12:16] == b"VP8X":
        continue
    if data[12:16] != b"VP8 ":
        raise ValueError(f"Unexpected WebP image data: {photo}")
    width = unpack_from("<H", data, 26)[0] & 0x3FFF
    height = unpack_from("<H", data, 28)[0] & 0x3FFF
    vp8x = chunk(b"VP8X", b"\x08\x00\x00\x00" + (width - 1).to_bytes(3, "little") + (height - 1).to_bytes(3, "little"))
    body = vp8x + data[12:] + gps_chunk
    photo.write_bytes(b"RIFF" + pack("<I", len(body) + 4) + b"WEBP" + body)
    print(photo.relative_to(ROOT))
