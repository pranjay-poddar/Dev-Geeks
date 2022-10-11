import {generate} from "./generate.js";
import {rayRing} from "./invoke.js";

export const effect = {
    invoke: (layer, data, currentFrame, totalFrames) => rayRing(layer, data, currentFrame, totalFrames)
}

export const rayRingEffect = {
    name: 'ray-rings', generateData: generate, effect: effect, effectChance: 50, requiresLayer: true,
}

