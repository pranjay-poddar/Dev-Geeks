import {findOneWayValue} from "../../../../core/math/findOneWayValue.js";
import {findValue} from "../../../../core/math/findValue.js";
import {randomId} from "../../../../core/math/random.js";
import {getWorkingDirectory} from "../../../../core/GlobalSettings.js";
import {Canvas2dFactory} from "../../../../core/factory/canvas/Canvas2dFactory.js";
import fs from "fs";
import {compositeImage} from "../../../supporting/compositeImage.js";
import {processDrawFunction} from "../../../supporting/processDrawFunction.js";

const draw = async (context, filename) => {
    for (let i = 0; i < context.data.numberOfGates; i++) {
        const loopCount = i + 1;
        const direction = loopCount % 2;
        const invert = direction <= 0;
        const theAngleGaston = findOneWayValue(0, 360 / context.data.numberOfSides, context.numberOfFrames, context.currentFrame, invert);
        const theAccentGaston = context.useAccentGaston ? findValue(context.data.gates[i].accentRange.lower, context.data.gates[i].accentRange.upper, context.data.gates[i].accentTimes, context.numberOfFrames, context.currentFrame) : 0;
        await context.canvas.drawPolygon2d(context.data.gates[i].radius, context.data.center, context.data.numberOfSides, theAngleGaston, context.data.thickness, context.data.innerColor, context.data.stroke + theAccentGaston, context.data.gates[i].color)
    }

    await context.canvas.toFile(filename);
}

export const gates = async (layer, data, currentFrame, numberOfFrames) => {

    const context = {
        currentFrame: currentFrame,
        numberOfFrames: numberOfFrames,
        useAccentGaston: true,
        theBlurGaston: Math.ceil(findValue(data.blurRange.lower, data.blurRange.upper, data.blurTimes, numberOfFrames, currentFrame)),
        drawing: getWorkingDirectory() + 'gate' + randomId() + '.png',
        underlayName: getWorkingDirectory() + 'gate-underlay' + randomId() + '.png',
        canvas: await Canvas2dFactory.getNewCanvas(data.width, data.height),
        data: data,
    }

    await processDrawFunction(draw, context);
    await compositeImage(context, layer);

    fs.unlinkSync(context.underlayName);
    fs.unlinkSync(context.drawing);
}