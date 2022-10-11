import {getColorFromBucket, getFinalImageSize, getNeutralFromBucket} from "../../../../core/GlobalSettings.js";
import {getRandomIntInclusive, randomNumber} from "../../../../core/math/random.js";
import {rayRingEffect} from "./effect.js";

const finalImageSize = getFinalImageSize();

const config = {
    circles: {lower: 4, upper: 8},
    radiusGap: 100,
    stroke: 0.25,
    thickness: 4,
    scaleFactor: 2,
    densityFactor: 0.90,
    accentRange: {bottom: {lower: 0, upper: 0}, top: {lower: 4, upper: 8}},
    blurRange: {bottom: {lower: 0, upper: 0}, top: {lower: 4, upper: 8}},
    accentTimes: {lower: 10, upper: 20},
    blurTimes: {lower: 2, upper: 4},
    lengthRange: {bottom: {lower: 0, upper: 15}, top: {lower: 20, upper: 200}},
    lengthTimes: {lower: 8, upper: 16},
    sparsityFactor: {lower: 4, upper: 8},
    speed: {lower: 20, upper: 20},
}

const getRays = (sparsityFactor) => {
    const rays = [];

    for (let i = 0; i < 360; i = i + sparsityFactor) {
        rays.push({
            length: {
                lower: getRandomIntInclusive(config.lengthRange.bottom.lower, config.lengthRange.bottom.upper),
                upper: getRandomIntInclusive(config.lengthRange.top.lower, config.lengthRange.top.upper)
            }, lengthTimes: getRandomIntInclusive(config.lengthTimes.lower, config.lengthTimes.upper)
        });
    }

    return rays;
}

const computeInitialInfo = (num) => {
    const info = [];
    for (let i = 0; i <= num; i++) {
        info.push({
            radius: config.radiusGap * (i + 1),
            color: getNeutralFromBucket(),
            outerColor: getColorFromBucket(),
            accentTimes: getRandomIntInclusive(config.accentTimes.lower, config.accentTimes.upper),
            accentRange: {
                lower: getRandomIntInclusive(config.accentRange.bottom.lower, config.accentRange.bottom.upper),
                upper: getRandomIntInclusive(config.accentRange.top.lower, config.accentRange.top.upper)
            },
            sparsityFactor: randomNumber(config.sparsityFactor.lower, config.sparsityFactor.upper) * (config.densityFactor / (i + 1)),
            speed: getRandomIntInclusive(config.speed.lower, config.speed.upper),
        });
    }

    for (let c = 0; c < info.length; c++) {
        info[c].rays = getRays(info[c].sparsityFactor);
    }

    return info;
}

export const generate = () => {
    const data = {
        numberOfCircles: getRandomIntInclusive(config.circles.lower, config.circles.upper),
        height: finalImageSize.height,
        width: finalImageSize.width,
        stroke: config.stroke,
        thickness: config.thickness,
        innerColor: getColorFromBucket(),
        scaleFactor: config.scaleFactor,
        center: {x: finalImageSize.width / 2, y: finalImageSize.height / 2},
        blurRange: {
            lower: getRandomIntInclusive(config.blurRange.bottom.lower, config.blurRange.bottom.upper),
            upper: getRandomIntInclusive(config.blurRange.top.lower, config.blurRange.top.upper)
        },
        blurTimes: getRandomIntInclusive(config.blurTimes.lower, config.blurTimes.upper),
        getInfo: () => {
            return `${rayRingEffect.name}: ${data.numberOfCircles} ray rings`
        }
    }

    data.circles = computeInitialInfo(data.numberOfCircles);

    return data;
}