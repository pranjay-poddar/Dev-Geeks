import {fuzzyRipple} from "./invoke.js";
import {generate} from "./generate.js";

export const effect = {
    invoke: (layer, data, currentFrame, totalFrames) => fuzzyRipple(layer, data, currentFrame, totalFrames)
}

export const fuzzyRippleEffect = {
    name: 'fuzzy-ripples',
    generateData: generate,
    effect: effect,
    effectChance: 50,
    requiresLayer: true,
}

