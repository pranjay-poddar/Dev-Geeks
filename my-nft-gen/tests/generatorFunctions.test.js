import {animateBackgroundEffect} from "../src/effects/effectTypes/primaryEffects/animateBackground/effect.js";
import {checkIfAnyNullOrUndefined} from "./helpers/checkIfAnyNullOrUndefined.js";
import {verticalScanLinesEffect} from "../src/effects/effectTypes/primaryEffects/scanLines/effect.js";
import {hexEffect} from "../src/effects/effectTypes/primaryEffects/hex/effect.js";
import {wireframeSpiralEffect} from "../src/effects/effectTypes/primaryEffects/wireframeSpiral/effect.js";
import {fuzzyRippleEffect} from "../src/effects/effectTypes/primaryEffects/fuzzyRipples/effect.js";
import {fuzzBandsEffect} from "../src/effects/effectTypes/primaryEffects/fuzzBands/effect.js";
import {gatesEffect} from "../src/effects/effectTypes/primaryEffects/gates/effect.js";
import {viewportEffect} from "../src/effects/effectTypes/primaryEffects/viewport/effect.js";
import {randomizeEffect} from "../src/effects/effectTypes/secondaryEffects/randomize/effect.js";
import {glowEffect} from "../src/effects/effectTypes/secondaryEffects/glow/effect.js";
import {fadeEffect} from "../src/effects/effectTypes/secondaryEffects/fade/effect.js";
import {blurEffect} from "../src/effects/effectTypes/finalImageEffects/blur/effect.js";
import {pixelateEffect} from "../src/effects/effectTypes/finalImageEffects/pixelate/effect.js";
import {glitchInverseEffect} from "../src/effects/effectTypes/finalImageEffects/glitchInverse/effect.js";
import {glitchFractalEffect} from "../src/effects/effectTypes/finalImageEffects/glitchFractal/effect.js";
import {
    glitchDrumrollHorizontalWaveEffect
} from "../src/effects/effectTypes/finalImageEffects/glitchDrumrollHorizontalWave/effect.js";
import {scopesEffect} from "../src/effects/effectTypes/primaryEffects/scopes/effect.js";
import {rayRingEffect} from "../src/effects/effectTypes/primaryEffects/rayRing/effect.js";
import {ampEffect} from "../src/effects/effectTypes/primaryEffects/amp/effect.js";


test('no null or undefined in scopesEffect generate function', () => {
    const hasNullOrUndefined = checkIfAnyNullOrUndefined(scopesEffect.generateData());
    expect(hasNullOrUndefined).toBe(false);
});

test('no null or undefined in animateBackgroundEffect generate function', () => {
    const hasNullOrUndefined = checkIfAnyNullOrUndefined(animateBackgroundEffect.generateData());
    expect(hasNullOrUndefined).toBe(false);
});

test('no null or undefined in hexEffect generate function', () => {
    const hasNullOrUndefined = checkIfAnyNullOrUndefined(hexEffect.generateData());
    expect(hasNullOrUndefined).toBe(false);
});

test('no null or undefined in verticalScanLinesEffect generate function', () => {
    const hasNullOrUndefined = checkIfAnyNullOrUndefined(verticalScanLinesEffect.generateData());
    expect(hasNullOrUndefined).toBe(false);
});

test('no null or undefined in wireframeSpiralEffect generate function', () => {
    const hasNullOrUndefined = checkIfAnyNullOrUndefined(wireframeSpiralEffect.generateData());
    expect(hasNullOrUndefined).toBe(false);
});

test('no null or undefined in fuzzyRippleEffect generate function', () => {
    const hasNullOrUndefined = checkIfAnyNullOrUndefined(fuzzyRippleEffect.generateData());
    expect(hasNullOrUndefined).toBe(false);
});

test('no null or undefined in fuzzBandsEffect generate function', () => {
    const hasNullOrUndefined = checkIfAnyNullOrUndefined(fuzzBandsEffect.generateData());
    expect(hasNullOrUndefined).toBe(false);
});

test('no null or undefined in gatesEffect generate function', () => {
    const hasNullOrUndefined = checkIfAnyNullOrUndefined(gatesEffect.generateData());
    expect(hasNullOrUndefined).toBe(false);
});

test('no null or undefined in ampEffect generate function', () => {
    const hasNullOrUndefined = checkIfAnyNullOrUndefined(ampEffect.generateData());
    expect(hasNullOrUndefined).toBe(false);
});

test('no null or undefined in viewportEffect generate function', () => {
    const hasNullOrUndefined = checkIfAnyNullOrUndefined(viewportEffect.generateData());
    expect(hasNullOrUndefined).toBe(false);
});

test('no null or undefined in randomizeEffect generate function', () => {
    const hasNullOrUndefined = checkIfAnyNullOrUndefined(randomizeEffect.generateData());
    expect(hasNullOrUndefined).toBe(false);
});

test('no null or undefined in glowEffect generate function', () => {
    const hasNullOrUndefined = checkIfAnyNullOrUndefined(glowEffect.generateData());
    expect(hasNullOrUndefined).toBe(false);
});

test('no null or undefined in fadeEffect generate function', () => {
    const hasNullOrUndefined = checkIfAnyNullOrUndefined(fadeEffect.generateData());
    expect(hasNullOrUndefined).toBe(false);
});

test('no null or undefined in blurEffect generate function', () => {
    const hasNullOrUndefined = checkIfAnyNullOrUndefined(blurEffect.generateData());
    expect(hasNullOrUndefined).toBe(false);
});

test('no null or undefined in pixelateEffect generate function', () => {
    const hasNullOrUndefined = checkIfAnyNullOrUndefined(pixelateEffect.generateData());
    expect(hasNullOrUndefined).toBe(false);
});

test('no null or undefined in glitchInverseEffect generate function', () => {
    const hasNullOrUndefined = checkIfAnyNullOrUndefined(glitchInverseEffect.generateData());
    expect(hasNullOrUndefined).toBe(false);
});

test('no null or undefined in glitchFractalEffect generate function', () => {
    const hasNullOrUndefined = checkIfAnyNullOrUndefined(glitchFractalEffect.generateData());
    expect(hasNullOrUndefined).toBe(false);
});

test('no null or undefined in glitchDrumrollHorizontalWaveEffect generate function', () => {
    const hasNullOrUndefined = checkIfAnyNullOrUndefined(glitchDrumrollHorizontalWaveEffect.generateData());
    expect(hasNullOrUndefined).toBe(false);
});

test('no null or undefined in ray-ring generate function', () => {
    const hasNullOrUndefined = checkIfAnyNullOrUndefined(rayRingEffect.generateData());
    expect(hasNullOrUndefined).toBe(false);
});