import {findOneWayValue} from "../src/core/math/findOneWayValue.js";

test('findOneWayValue: begin and end match', () => {

    const min = 0;
    const max = 18;

    const totalFrame = 100;

    const beginValue = Math.floor(findOneWayValue(min, max, totalFrame, 0));
    const endValue = Math.floor(findOneWayValue(min, max, totalFrame, totalFrame));

    expect(beginValue).toBe(min);
    expect(endValue).toBe(max);

});

test('findOneWayValue: begin and end match, inverted', () => {

    const min = 0;
    const max = 18;

    const totalFrame = 100;

    const beginValue = Math.floor(findOneWayValue(min, max, totalFrame, 0, true));
    const endValue = Math.floor(findOneWayValue(min, max, totalFrame, totalFrame, true));

    expect(beginValue).toBe(max);
    expect(endValue).toBe(min);
});


test('findOneWayValue: midpoint match', () => {

    const min = 0;
    const max = 20;

    const totalFrame = 100;

    const midPointValue = Math.floor(findOneWayValue(min, max, totalFrame, totalFrame / 2));

    expect(midPointValue).toBe(10);
});

test('findOneWayValue: midpoint match, inverted', () => {

    const min = 0;
    const max = 20;

    const totalFrame = 100;

    const midPointValue = Math.floor(findOneWayValue(min, max, totalFrame, totalFrame / 2, true));

    expect(midPointValue).toBe(10);
});

test('findOneWayValue: left quarter match', () => {

    const min = 0;
    const max = 20;

    const totalFrame = 100;

    const midPointValue = Math.floor(findOneWayValue(min, max, totalFrame, 25));

    expect(midPointValue).toBe(5);
});

test('findOneWayValue: left quarter match, inverted', () => {

    const min = 0;
    const max = 20;

    const totalFrame = 100;

    const midPointValue = Math.floor(findOneWayValue(min, max, totalFrame, 25, true));

    expect(midPointValue).toBe(15);
});


test('findOneWayValue: right quarter match', () => {

    const min = 0;
    const max = 20;

    const totalFrame = 100;

    const midPointValue = Math.floor(findOneWayValue(min, max, totalFrame, 75));

    expect(midPointValue).toBe(15);
});

test('findOneWayValue: right match, inverted', () => {

    const min = 0;
    const max = 20;

    const totalFrame = 100;

    const midPointValue = Math.floor(findOneWayValue(min, max, totalFrame, 75, true));

    expect(midPointValue).toBe(5);
});