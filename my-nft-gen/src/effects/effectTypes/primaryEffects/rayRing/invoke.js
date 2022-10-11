import {randomId} from "../../../../core/math/random.js";
import {getWorkingDirectory,} from "../../../../core/GlobalSettings.js";
import fs from "fs";
import {findValue} from "../../../../core/math/findValue.js";
import {Canvas2dFactory} from "../../../../core/factory/canvas/Canvas2dFactory.js";
import {compositeImage} from "../../../supporting/compositeImage.js";
import {processDrawFunction} from "../../../supporting/processDrawFunction.js";
import {findOneWayValue} from "../../../../core/math/findOneWayValue.js";


async function drawRayRingInstance(withAccentGaston, i, context) {
    const theAccentGaston = withAccentGaston ? findValue(context.data.circles[i].accentRange.lower, context.data.circles[i].accentRange.upper, context.data.circles[i].accentTimes, context.numberOfFrames, context.currentFrame) : 0;

    const invertTheRayGaston = (i + 1) % 2;
    const theRayGaston = findOneWayValue(0, context.data.circles[i].sparsityFactor * context.data.circles[i].speed, context.numberOfFrames, context.currentFrame);
    await context.canvas.drawRing2d(context.data.center, context.data.circles[i].radius, context.data.thickness, context.data.circles[i].color, (context.data.stroke + theAccentGaston), context.data.circles[i].outerColor)

    let rayIndex = 0;
    for (let a = 0; a < 360; a = a + context.data.circles[i].sparsityFactor) {
        const theLengthGaston = findValue(context.data.circles[i].rays[rayIndex].length.lower, context.data.circles[i].rays[rayIndex].length.upper, context.data.circles[i].rays[rayIndex].lengthTimes, context.numberOfFrames, context.currentFrame);
        const theFinalAngle = invertTheRayGaston === 0 ? (a + theRayGaston) % 360 : (a - theRayGaston) % 360;
        await context.canvas.drawRay2d(context.data.center, (context.data.stroke + theAccentGaston), context.data.circles[i].outerColor, context.data.circles[i].color, theFinalAngle, context.data.circles[i].radius, theLengthGaston);
        rayIndex++;
    }
}

const draw = async (context, filename) => {
    for (let i = 0; i < context.data.numberOfCircles; i++) {
        await drawRayRingInstance(context.useAccentGaston, i, context);
    }
    await context.canvas.toFile(filename);
}

export const rayRing = async (layer, data, currentFrame, numberOfFrames) => {

    const context = {
        currentFrame: currentFrame,
        numberOfFrames: numberOfFrames,
        useAccentGaston: true,
        drawing: getWorkingDirectory() + 'ray-ring' + randomId() + '.png',
        underlayName: getWorkingDirectory() + 'ray-ring-underlay' + randomId() + '.png',
        canvas: await Canvas2dFactory.getNewCanvas(data.width, data.height),
        data: data
    }

    await processDrawFunction(draw, context);
    await compositeImage(context, layer);

    fs.unlinkSync(context.drawing);
    fs.unlinkSync(context.underlayName);

}