import {generate} from "./generate.js";
import {fuzzBands} from "./invoke.js";

export const effect = {
    invoke: (layer, data, currentFrame, totalFrames) => fuzzBands(layer, data, currentFrame, totalFrames)
}

export const fuzzBandsEffect = {
    name: 'fuzz-bands',
    generateData: generate,
    effect: effect,
    effectChance: 50,
    requiresLayer: true,
}

