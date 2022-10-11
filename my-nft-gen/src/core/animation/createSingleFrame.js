import {LayerFactory} from "../factory/layer/LayerFactory.js";

//This function creates a new jimp image (layer) for each main effect
const getLayers = async (w, h, context) => {
    const extraLayers = [];
    for (let i = 0; i < context.effects.length; i++) { //effect is found in the outermost layer of this function
        extraLayers.push(await LayerFactory.getNewLayer(h, w, '#00000000'))
    }
    return extraLayers;
}

/////////////////////////////
//Process the main and secondary effects
////////////////////////////
const processFrame = async (frameNumber, context) => {
    return new Promise(async (resolve) => {

        const mainLayeredEffects = []; //will be an array of promises

        for (let i = 0; i < context.layers.length; i++) {
            /////////////////////////////////////////////////////////////////////
            // invokes one effect, which returns a promise
            // In this promise
            //      main effect occurs
            //      main effect then awaits attached secondary effects in order
            // effect promise is added to array
            /////////////////////////////////////////////////////////////////////
            mainLayeredEffects.push(context.effects[i].invokeEffect(context.layers[i], frameNumber, context.numberOfFrame));
        }

        //when all effect promises complete
        Promise.all(mainLayeredEffects).then(() => {
            //resolve process frame promise
            resolve(); //we have completed a single frame
        });
    });
}


/**
 * @param frameNumber - The current frame we are on.
 * @param context - holds information relevant to creating the animation
 * @returns {Promise<void>}
 *
 * This function, in general, creates an empty jimp image for each main layer effect
 * Each effect is then applied to the image
 * Then based on their order in the effects array they are composed into a single image
 */
export const createSingleFrame = async (frameNumber, context) => {
    ////////////////////////
    //get fresh files every loop
    ////////////////////////
    const background = await LayerFactory.getNewLayer(context.finalImageSize.height, context.finalImageSize.width, context.backgroundColor);
    context.layers = await getLayers(context.finalImageSize.width, context.finalImageSize.height, context)

    /////////////////////////////
    //run all effects for frame
    ////////////////////////////
    await processFrame(frameNumber, context);

    ////////////////////////
    //COMPOSE
    //Secondary Magic:  this composites the layers into one image, in order they are in the layers array.
    //Last is on top
    ///////////////////////
    for (let i = 0; i < context.layers.length; i++) {
        await background.compositeLayerOver(context.layers[i]);
    }

    ////////////////////////
    // apply final image effects one at a time
    ////////////////////////
    for (let e = 0; e < context.finalImageEffects.length; e++) {
        await context.finalImageEffects[e].invokeEffect(background, frameNumber, context.numberOfFrame);
    }

    //////////////////////
    // write to disk
    // still can run multiple instances at once
    /////////////////////
    const filename = context.workingDirectory + context.finalFileName + '-frame-' + frameNumber.toString() + '.png';
    await background.toFile(filename);
    context.frameFilenames.push(filename);
}