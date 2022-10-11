import {getWorkingDirectory} from "../../../../core/GlobalSettings.js";
import {getRandomIntInclusive, randomId} from "../../../../core/math/random.js";
import Jimp from "jimp";
import fs from "fs";

export const glitchInverse = async (layer, data) => {

    const theGlitch = getRandomIntInclusive(0, 100);
    if (theGlitch <= data.glitchChance) {
        const filename = getWorkingDirectory() + 'glitch-inverse' + randomId() + '.png';

        await layer.toFile(filename);

        const jimpImage = await Jimp.read(filename);

        await jimpImage.invert();

        await jimpImage.writeAsync(filename);

        await layer.fromFile(filename);

        fs.unlinkSync(filename);
    }
}
