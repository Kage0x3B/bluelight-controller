// rainbow-colors, taken from http://goo.gl/Cs3H0v
export function colorWheel(pos: number): number {
    pos = 255 - pos;

    if (pos < 85) {
        return rgbToInt(255 - pos * 3, 0, pos * 3);
    } else if (pos < 170) {
        pos -= 85;
        return rgbToInt(0, pos * 3, 255 - pos * 3);
    } else {
        pos -= 170;
        return rgbToInt(pos * 3, 255 - pos * 3, 0);
    }
}

function rgbToInt(r: number, g: number, b: number): number {
    return ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff);
}

export function rgbwToInt(r: number, g: number, b: number, w: number): number {
    return ((w & 0xff) << 24) | ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff)
}
