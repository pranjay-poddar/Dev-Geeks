import {findPointByAngleAndCircle} from "../../../../core/math/drawingMath.js";
import {findValue} from "../../../../core/math/findValue.js";
import {getWorkingDirectory} from "../../../../core/GlobalSettings.js";
import fs from "fs";
import {compositeImage} from "../../../supporting/compositeImage.js";
import {randomId} from "../../../../core/math/random.js";
import {Canvas2dFactory} from "../../../../core/factory/canvas/Canvas2dFactory.js";
import {processDrawFunction} from "../../../supporting/processDrawFunction.js";
import {findOneWayValue} from "../../../../core/math/findOneWayValue.js";

const drawRing = async (pos, radius, innerStroke, innerColor, outerStroke, outerColor, context) => {
    const theGaston = findValue(radius, radius + context.data.ripple, context.data.times, context.numberOfFrames, context.currentFrame);
    await context.canvas.drawRing2d(pos, theGaston, innerStroke, innerColor, outerStroke + context.theAccentGaston, outerColor)
}

const drawRings = async (pos, color, radius, numberOfRings, context) => {
    for (let i = 0; i < numberOfRings; i++) {
        await drawRing(pos, radius / numberOfRings * i, context.data.thickness, context.data.innerColor, context.data.stroke, color, context);
    }
}

const draw = async (context, filename) => {
    await drawRings(findPointByAngleAndCircle(context.data.center, 30 + context.theAngleGaston, context.data.smallerRingsGroupRadius), context.data.smallColor, context.data.smallRadius, context.data.smallNumberOfRings, context);
    await drawRings(findPointByAngleAndCircle(context.data.center, 90 + context.theAngleGaston, context.data.smallerRingsGroupRadius), context.data.smallColor, context.data.smallRadius, context.data.smallNumberOfRings, context);
    await drawRings(findPointByAngleAndCircle(context.data.center, 150 + context.theAngleGaston, context.data.smallerRingsGroupRadius), context.data.smallColor, context.data.smallRadius, context.data.smallNumberOfRings, context);
    await drawRings(findPointByAngleAndCircle(context.data.center, 210 + context.theAngleGaston, context.data.smallerRingsGroupRadius), context.data.smallColor, context.data.smallRadius, context.data.smallNumberOfRings, context);
    await drawRings(findPointByAngleAndCircle(context.data.center, 270 + context.theAngleGaston, context.data.smallerRingsGroupRadius), context.data.smallColor, context.data.smallRadius, context.data.smallNumberOfRings, context);
    await drawRings(findPointByAngleAndCircle(context.data.center, 330 + context.theAngleGaston, context.data.smallerRingsGroupRadius), context.data.smallColor, context.data.smallRadius, context.data.smallNumberOfRings, context);

    await drawRings(context.data.center, context.data.largeColor, context.data.largeRadius, context.data.largeNumberOfRings, context);

    await context.canvas.drawPolygon2d(context.data.smallerRingsGroupRadius, context.data.center, 6, 30 + context.theAngleGaston, context.data.thickness + context.theAccentGaston, context.data.innerColor, context.data.stroke, context.data.smallColor)

    await context.canvas.toFile(filename);
}

export const fuzzyRipple = async (layer, data, currentFrame, numberOfFrames) => {
    const context = {
        currentFrame: currentFrame,
        numberOfFrames: numberOfFrames,
        theAccentGaston: findValue(data.accentRange.lower, data.accentRange.upper, data.accentTimes, numberOfFrames, currentFrame),
        theBlurGaston: Math.ceil(findValue(data.blurRange.lower, data.blurRange.upper, data.blurTimes, numberOfFrames, currentFrame)),
        theAngleGaston: findOneWayValue(0, 60, numberOfFrames, currentFrame),
        drawing: getWorkingDirectory() + 'fuzzy-ripples' + randomId() + '.png',
        underlayName: getWorkingDirectory() + 'fuzzy-ripples-underlay' + randomId() + '.png',
        canvas: await Canvas2dFactory.getNewCanvas(data.width, data.height),
        data: data,
    }

    await processDrawFunction(draw, context);
    await compositeImage(context, layer);

    fs.unlinkSync(context.drawing);
    fs.unlinkSync(context.underlayName);
}
