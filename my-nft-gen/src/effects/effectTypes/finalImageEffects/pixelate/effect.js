import {pixelate} from "./invoke.js";
import {generate} from "./generate.js";

export const effect = {
    invoke: (layer, data, currentFrame, totalFrames) => pixelate(layer, data, currentFrame, totalFrames)
}

export const pixelateEffect = {
    name: 'pixelate',
    generateData: generate,
    effect: effect,
    effectChance: 0,
    requiresLayer: false,
}


