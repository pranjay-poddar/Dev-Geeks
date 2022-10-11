import {findValue} from "../src/core/math/findValue.js";

test('findValue: begin and end match', () => {

    const min = 0;
    const max = 18;
    const times = 1;
    const totalFrame = 100;

    const beginValue = Math.floor(findValue(min, max, times, totalFrame, 0));
    const endValue = Math.floor(findValue(min, max, times, totalFrame, totalFrame));

    expect(beginValue).toBe(endValue);
});

test('findValue: begin and end match, inverted', () => {

    const min = 0;
    const max = 18;
    const times = 1;
    const totalFrame = 100;

    const beginValue = Math.floor(findValue(min, max, times, totalFrame, 0, true));
    const endValue = Math.floor(findValue(min, max, times, totalFrame, totalFrame, true));

    expect(beginValue).toBe(endValue);
});


test('findValue: begin and end match, 2 amount of times', () => {

    const min = 0;
    const max = 18;
    const times = 2;
    const totalFrame = 100;

    const beginValue = Math.floor(findValue(min, max, times, totalFrame, 0));
    const endValue = Math.floor(findValue(min, max, times, totalFrame, totalFrame));

    expect(beginValue).toBe(endValue);
});

test('findValue: begin and end match, 2 amount of times, inverted', () => {

    const min = 0;
    const max = 18;
    const times = 2;
    const totalFrame = 100;

    const beginValue = Math.floor(findValue(min, max, times, totalFrame, 0, true));
    const endValue = Math.floor(findValue(min, max, times, totalFrame, totalFrame, true));

    expect(beginValue).toBe(endValue);
});


test('findValue: midpoint match', () => {

    const min = 0;
    const max = 20;
    const times = 1;
    const totalFrame = 100;

    const midPointValue = Math.floor(findValue(min, max, times, totalFrame, totalFrame / 2));

    expect(midPointValue).toBe(max);
});

test('findValue: midpoint match, inverted', () => {

    const min = 0;
    const max = 20;
    const times = 1;
    const totalFrame = 100;

    const midPointValue = Math.floor(findValue(min, max, times, totalFrame, totalFrame / 2, true));

    expect(midPointValue).toBe(min);
});

test('findValue: left quarter match', () => {

    const min = 0;
    const max = 20;
    const times = 1;
    const totalFrame = 100;

    const midPointValue = Math.floor(findValue(min, max, times, totalFrame, 25));

    expect(midPointValue).toBe(max / 2);
});

test('findValue: left quarter match, inverted', () => {

    const min = 0;
    const max = 20;
    const times = 1;
    const totalFrame = 100;

    const midPointValue = Math.floor(findValue(min, max, times, totalFrame, 25, true));

    expect(midPointValue).toBe(max / 2);
});


test('findValue: right quarter match', () => {

    const min = 0;
    const max = 20;
    const times = 1;
    const totalFrame = 100;

    const midPointValue = Math.floor(findValue(min, max, times, totalFrame, 75));

    expect(midPointValue).toBe(max / 2);
});

test('findValue: right match, inverted', () => {

    const min = 0;
    const max = 20;
    const times = 1;
    const totalFrame = 100;

    const midPointValue = Math.floor(findValue(min, max, times, totalFrame, 75, true));

    expect(midPointValue).toBe(max / 2);
});