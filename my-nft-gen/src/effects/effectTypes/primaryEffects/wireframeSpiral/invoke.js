//n2, nextTerm, -twistCount
import {findPointByAngleAndCircle} from "../../../../core/math/drawingMath.js";
import {findValue} from "../../../../core/math/findValue.js";
import {getWorkingDirectory} from "../../../../core/GlobalSettings.js";
import {randomId} from "../../../../core/math/random.js";
import {Canvas2dFactory} from "../../../../core/factory/canvas/Canvas2dFactory.js";
import {compositeImage} from "../../../supporting/compositeImage.js";
import fs from "fs";
import {processDrawFunction} from "../../../supporting/processDrawFunction.js";

const drawRay = async (stroke, angle, loopControl, context, flipTwist) => {
    angle = angle + (((context.data.sparsityFactor * context.data.speed) / context.numberOfFrames) * context.currentFrame) * context.data.direction;

    const start = findPointByAngleAndCircle(context.data.center, angle, loopControl.n2 + context.data.radiusConstant)
    const end = findPointByAngleAndCircle(context.data.center, angle + (loopControl.twistCount * flipTwist * context.data.sparsityFactor), loopControl.nextTerm + context.data.radiusConstant);

    await context.canvas.drawGradientLine2d(start, end, stroke, context.data.color1, context.data.color2);
}

const draw = async (context, filename) => {
    const loopControl = {
        twistCount: 2,
        n1: context.data.unitLength,
        n2: context.data.unitLength,
        nextTerm: context.data.unitLength + context.data.unitLength
    }

    while (loopControl.nextTerm <= context.data.width) {

        for (let i = 0; i < 360; i = i + context.data.sparsityFactor) {
            await drawRay(context.data.stroke + context.theAccentGaston, i, loopControl, context, 1)
            await drawRay(context.data.stroke + context.theAccentGaston, i, loopControl, context, -1)
        }

        //assignment for next loop
        loopControl.twistCount++;
        loopControl.n1 = loopControl.n2;
        loopControl.n2 = loopControl.nextTerm;
        loopControl.nextTerm = loopControl.n1 + loopControl.n2;
    }

    await context.canvas.toFile(filename)
}

export const wireframeSpiral = async (layer, data, currentFrame, numberOfFrames) => {

    const context = {
        currentFrame: currentFrame,
        numberOfFrames: numberOfFrames,
        theAccentGaston: findValue(data.accentRange.lower, data.accentRange.upper, data.accentTimes, numberOfFrames, currentFrame),
        drawing: getWorkingDirectory() + 'wireframe-spiral' + randomId() + '.png',
        underlayName: getWorkingDirectory() + 'wireframe-spiral-underlay' + randomId() + '.png',
        canvas: await Canvas2dFactory.getNewCanvas(data.width, data.height),
        data: data,
    }

    await processDrawFunction(draw, context);
    await compositeImage(context, layer);

    fs.unlinkSync(context.underlayName);
    fs.unlinkSync(context.drawing);
}