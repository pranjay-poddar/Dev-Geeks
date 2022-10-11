import Jimp from "jimp";
import fs from "fs";
import {getWorkingDirectory} from "../../../GlobalSettings.js";
import {randomId} from "../../../math/random.js";

export class JimpLayerStrategy {
    constructor() {
        this.internalRepresentation = null;
    }

    async newLayer(height, width, backgroundColor) {
        this.internalRepresentation = new Jimp(width, height, Jimp.cssColorToHex(backgroundColor))
    }

    async fromFile(filename) {
        this.internalRepresentation = await Jimp.read(filename);
    }

    async toFile(filename) {
        await this.internalRepresentation.writeAsync(filename)
    }

    async compositeLayerOver(layer) {
        const overlayFile = getWorkingDirectory() + 'overlay' + randomId() + '.png';
        await layer.toFile(overlayFile)

        const overlay = await Jimp.read(overlayFile);

        const top = Math.ceil((overlay.bitmap.height - this.internalRepresentation.bitmap.height) / 2);
        const left = Math.ceil((overlay.bitmap.width - this.internalRepresentation.bitmap.width) / 2);

        this.internalRepresentation.composite(overlay, -left, -top, {
            mode: Jimp.BLEND_SOURCE_OVER,
        });

        fs.unlinkSync(overlayFile);
    }

    async adjustLayerOpacity(opacity) {
        await this.internalRepresentation.opacity(opacity);
    }

    async blur(byPixels) {
        if (byPixels > 0) {
            await new Promise((resolve, reject) => {
                this.internalRepresentation.blur(byPixels, function (err) {

                    if (err) {
                        console.log(err);
                        reject()
                    }

                    resolve();
                })
            })
        }
    }

    async rotate(angle) {
        await this.internalRepresentation.rotate(angle, false);
    }

    async resize(height, width) {
        await this.internalRepresentation.resize(width, height);
    }
}