import {generate} from "./generate.js";
import {verticalScanLines} from "./invoke.js";

export const effect = {
    invoke: (layer, data, currentFrame, totalFrames) => verticalScanLines(layer, data, currentFrame, totalFrames)
}

export const verticalScanLinesEffect = {
    name: 'scan lines', generateData: generate, effect: effect, effectChance: 0, requiresLayer: true,
}

