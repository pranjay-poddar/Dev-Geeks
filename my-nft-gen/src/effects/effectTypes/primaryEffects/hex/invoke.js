import {findOneWayValue} from "../../../../core/math/findOneWayValue.js";
import {findPointByAngleAndCircle} from "../../../../core/math/drawingMath.js";
import {getFinalImageSize, getWorkingDirectory} from "../../../../core/GlobalSettings.js";
import {findValue} from "../../../../core/math/findValue.js";
import {randomId} from "../../../../core/math/random.js";
import {Canvas2dFactory} from "../../../../core/factory/canvas/Canvas2dFactory.js";
import {compositeImage} from "../../../supporting/compositeImage.js";
import fs from "fs";
import {processDrawFunction} from "../../../supporting/processDrawFunction.js";

const finalImageSize = getFinalImageSize();

const drawHexLine = async (angle, index, context) => {
    const loopCount = index + 1;
    const direction = loopCount % 2;
    const invert = direction <= 0;

    const theAngleGaston = findOneWayValue(angle, angle + context.data.sparsityFactor, context.numberOfFrames, context.currentFrame, invert);
    const theRotateGaston = findOneWayValue(theAngleGaston, theAngleGaston + 360, context.numberOfFrames, context.currentFrame, invert)

    const scaleBy = (context.data.scaleFactor * loopCount);
    const radius = context.data.radiusFactor * scaleBy;
    const gapRadius = ((finalImageSize.height * .05) + radius + (context.data.gapFactor * scaleBy) * loopCount)
    const pos = findPointByAngleAndCircle(context.data.center, theAngleGaston, gapRadius)

    await context.canvas.drawPolygon2d(radius, pos, 6, theRotateGaston, context.data.thickness * scaleBy, context.data.innerColor, (context.data.stroke + context.accentBoost) * scaleBy, context.data.color)
}

const draw = async (context, filename) => {
    context.accentBoost = context.theAccentGaston;
    for (let i = 0; i < 6; i++) {
        for (let a = 0; a < 360; a = a + context.data.sparsityFactor) {
            await drawHexLine(a, i, context)
        }
    }
    await context.canvas.toFile(filename);
}

export const hex = async (layer, data, currentFrame, numberOfFrames) => {

    const context = {
        currentFrame: currentFrame,
        numberOfFrames: numberOfFrames,
        theAccentGaston: findValue(data.accentRange.lower, data.accentRange.upper, data.accentTimes, numberOfFrames, currentFrame),
        theBlurGaston: Math.ceil(findValue(data.blurRange.lower, data.blurRange.upper, data.blurTimes, numberOfFrames, currentFrame)),
        drawing: getWorkingDirectory() + 'hex' + randomId() + '.png',
        underlayName: getWorkingDirectory() + 'hex-under' + randomId() + '.png',
        canvas: await Canvas2dFactory.getNewCanvas(data.width, data.height),
        data: data,
    }

    await processDrawFunction(draw, context);
    await compositeImage(context, layer);

    fs.unlinkSync(context.drawing);
    fs.unlinkSync(context.underlayName);
}