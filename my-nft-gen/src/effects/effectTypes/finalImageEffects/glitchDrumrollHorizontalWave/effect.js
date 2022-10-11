import {glitchDrumrollHorizontalWave} from "./invoke.js";
import {generate} from "./generate.js";

export const effect = {
    invoke: (layer, data, currentFrame, totalFrames) => glitchDrumrollHorizontalWave(layer, data, currentFrame, totalFrames)
}

export const glitchDrumrollHorizontalWaveEffect = {
    name: 'glitch drumroll horizontal wave',
    generateData: generate,
    effect: effect,
    effectChance: 0,
    requiresLayer: false,
}


