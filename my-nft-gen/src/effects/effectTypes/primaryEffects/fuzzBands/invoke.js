import {findValue} from "../../../../core/math/findValue.js";
import {getWorkingDirectory} from "../../../../core/GlobalSettings.js";
import {randomId} from "../../../../core/math/random.js";
import {Canvas2dFactory} from "../../../../core/factory/canvas/Canvas2dFactory.js";
import {compositeImage} from "../../../supporting/compositeImage.js";
import fs from "fs";
import {processDrawFunction} from "../../../supporting/processDrawFunction.js";

const draw = async (context, filename) => {
    for (let i = 0; i < context.data.numberOfCircles; i++) {
        const theAccentGaston = context.useAccentGaston ? findValue(context.data.circles[i].accentRange.lower, context.data.circles[i].accentRange.upper, context.data.circles[i].accentTimes, context.numberOfFrames, context.currentFrame) : 0;
        await context.canvas.drawRing2d(context.data.center, context.data.circles[i].radius, context.data.thickness, context.data.innerColor, (context.data.stroke + theAccentGaston), context.data.circles[i].color)
    }

    await context.canvas.toFile(filename);
}

export const fuzzBands = async (layer, data, currentFrame, numberOfFrames) => {

    const context = {
        currentFrame: currentFrame,
        numberOfFrames: numberOfFrames,
        useAccentGaston: true,
        theBlurGaston: Math.ceil(findValue(data.blurRange.lower, data.blurRange.upper, data.blurTimes, numberOfFrames, currentFrame)),
        drawing: getWorkingDirectory() + 'ring' + randomId() + '.png',
        underlayName: getWorkingDirectory() + 'ring-underlay' + randomId() + '.png',
        canvas: await Canvas2dFactory.getNewCanvas(data.width, data.height),
        data: data,
    }

    await processDrawFunction(draw, context);
    await compositeImage(context, layer);

    fs.unlinkSync(context.drawing);
    fs.unlinkSync(context.underlayName);

}
