import {getRandomIntInclusive, randomNumber} from "../../../../core/math/random.js";
import {getColorFromBucket, getFinalImageSize,} from "../../../../core/GlobalSettings.js";
import {verticalScanLinesEffect} from "./effect.js";

const config = {
    lines: {lower: 4, upper: 8},
    minlength: {lower: 25, upper: 75},
    maxlength: {lower: 100, upper: 500},
    times: {lower: 8, upper: 16},
    alphaRange: {bottom: {lower: 0, upper: 0.3}, top: {lower: 0.4, upper: 0.5}},
    alphaTimes: {lower: 4, upper: 8},
    color: getColorFromBucket()
}

const getPixelTrailLength = () => {
    return {
        min: getRandomIntInclusive(config.minlength.lower, config.minlength.upper),
        max: getRandomIntInclusive(config.maxlength.lower, config.maxlength.upper),
        times: getRandomIntInclusive(config.times.lower, config.times.upper),
        alphaRange: {
            lower: randomNumber(config.alphaRange.bottom.lower, config.alphaRange.bottom.upper),
            upper: randomNumber(config.alphaRange.top.lower, config.alphaRange.top.upper)
        },
        alphaTimes: getRandomIntInclusive(config.alphaTimes.lower, config.alphaTimes.upper)
    }
}

const fillLineDetail = (width) => {
    const pixelLine = [];
    for (let i = 0; i < width; i++) {
        pixelLine.push(getPixelTrailLength());
    }
    return pixelLine;
}


const computeInitialLineInfo = (numberOfLines, height, width) => {
    const lineInfo = [];

    for (let i = 0; i <= numberOfLines; i++) {
        lineInfo.push({
            lineStart: getRandomIntInclusive(0, height), pixelLine: fillLineDetail(width),
        });
    }

    return lineInfo;
}

export const generate = () => {

    const finalImageSize = getFinalImageSize();

    const data = {
        numberOfLines: getRandomIntInclusive(config.lines.lower, config.lines.upper),
        height: finalImageSize.height + (config.maxlength.upper),
        width: finalImageSize.width,
        color: config.color,
        getInfo: () => {
            return `${verticalScanLinesEffect.name}: ${data.numberOfLines} lines`
        }
    }

    data.lineInfo = computeInitialLineInfo(data.numberOfLines, data.height, data.width);

    return data;
}
