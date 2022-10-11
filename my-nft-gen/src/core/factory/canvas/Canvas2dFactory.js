import {getCanvasStrategy} from "../../GlobalSettings.js";
import {NodeCanvasStrategy} from "./strategy/NodeCanvasStrategy.js";
import {Canvas2d} from "./Canvas2d.js";

export class Canvas2dFactory {
    constructor() {
    }

    static getNewCanvas = async (width, height) => {
        switch (getCanvasStrategy()) {
            case 'node-canvas':
                const canvas = new Canvas2d(new NodeCanvasStrategy())
                await canvas.newCanvas(width, height);
                return canvas;
            /*case 'node-p5':*/

            default:
                throw 'Not a valid layer strategy';
        }
    }
}
