import {generate} from "./generate.js";
import {hex} from "./invoke.js";

export const effect = {
    invoke: (layer, data, currentFrame, totalFrames) => hex(layer, data, currentFrame, totalFrames)
}

export const hexEffect = {
    name: 'hex',
    generateData: generate,
    effect: effect,
    effectChance: 50,
    requiresLayer: true,
}

