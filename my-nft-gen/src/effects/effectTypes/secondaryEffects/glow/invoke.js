import {getWorkingDirectory} from "../../../../core/GlobalSettings.js";
import {randomId} from "../../../../core/math/random.js";
import Jimp from "jimp";
import {findValue} from "../../../../core/math/findValue.js";
import fs from "fs";

export const glowAnimated = async (layer, data, currentFrame, totalFrames) => {
    const filename = getWorkingDirectory() + 'glow' + randomId() + '.png';

    await layer.toFile(filename);

    const jimpImage = await Jimp.read(filename);

    const hue = findValue(data.lower, data.upper, data.times, totalFrames, currentFrame)
    await jimpImage.color([{apply: 'hue', params: [hue]}]);

    await jimpImage.writeAsync(filename);

    await layer.fromFile(filename);

    fs.unlinkSync(filename)
}