import {getWorkingDirectory} from "../../../../core/GlobalSettings.js";
import {getRandomIntInclusive, randomId} from "../../../../core/math/random.js";
import Jimp from "jimp";
import {LayerFactory} from "../../../../core/factory/layer/LayerFactory.js";
import fs from "fs";

export const glitchFractal = async (layer, data) => {

    const theGlitch = getRandomIntInclusive(0, 100);
    if (theGlitch <= data.glitchChance) {
        const filename = getWorkingDirectory() + 'fractal' + randomId() + '_underlay.png';

        await layer.toFile(filename);

        const underlay = await Jimp.read(filename);

        /////////////////////
        // https://github.com/JKirchartz/Glitchy3bitdither/blob/master/source/glitches/fractal.js
        /////////////////////
        for (let j = 0; j < underlay.bitmap.data.length; j++) {
            if (parseInt(underlay.bitmap.data[(j * data.theRandom) % underlay.bitmap.data.length], 10) < parseInt(underlay.bitmap.data[j], 10)) {
                underlay.bitmap.data[j] = underlay.bitmap.data[(j * data.theRandom) % underlay.bitmap.data.length];
            }
        }

        await underlay.writeAsync(filename)

        const compositeLayer = await LayerFactory.getLayerFromFile(filename);

        await compositeLayer.adjustLayerOpacity(0.9);

        await layer.compositeLayerOver(compositeLayer);

        fs.unlinkSync(filename);
    }
}