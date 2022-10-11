import {LayerFactory} from "../../../../core/factory/layer/LayerFactory.js";

export const imageOverlay = async (layer, data) => {
    let tempLayer = await LayerFactory.getLayerFromFile(data.imageOverlay);
    await layer.compositeLayerOver(tempLayer)
}
