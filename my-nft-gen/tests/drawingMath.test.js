import {degreesToRadians, findPointByAngleAndCircle} from "../src/core/math/drawingMath.js";

test('findPointByAngleAndCircle: point is correct', () => {

    const expected = {
        "x": 81.91520442889917,
        "y": 57.35764363510461
    }

    const point = findPointByAngleAndCircle({x: 0, y: 0}, 35, 100)

    expect(point.x).toBe(expected.x);
    expect(point.y).toBe(expected.y);
});

test('degreesToRadians', () => {

    const expected = 1.5707963267948966;
    const actual = degreesToRadians(90)

    expect(actual).toBe(expected);
});