import {animateBackground} from "./invoke.js";
import {generate} from "./generate.js";

export const effect = {
    invoke: (layer, data) => animateBackground(layer, data)
}

export const animateBackgroundEffect = {
    name: 'static background',
    generateData: generate,
    effect: effect,
    effectChance: 5,
    requiresLayer: true,
}

