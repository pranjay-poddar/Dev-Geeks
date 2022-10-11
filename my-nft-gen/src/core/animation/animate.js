import {getFinalImageSize, getLayerStrategy, getNeutralFromBucket, getWorkingDirectory} from "../GlobalSettings.js";
import {generateFinalImageEffects, generatePrimaryEffects} from "../../effects/control/generateEffect.js";
import {composeInfo} from "../utils/composeInfo.js";
import {createSingleFrame} from "./createSingleFrame.js";
import {writeArtistCard} from "../output/writeArtistCard.js";
import {writeToMp4} from "../output/writeToMp4.js";
import {writeScreenCap} from "../output/writeScreenCap.js";
import fs from "fs";
import {timeLeft} from "../utils/timeLeft.js";

/**
 * @param config - Responsible for filename of gif, total number of frames, gif color depth, and if to skip frames ( frameInc )
 * @returns {Promise<void>} - return nothing, just await it
 */
export const animate = async (config) => {

    config.startTime = new Date();

    const context = {
        numberOfFrame: config.numberOfFrame,
        finalImageSize: getFinalImageSize(),
        workingDirectory: getWorkingDirectory(),
        layerStrategy: getLayerStrategy(),

        backgroundColor: getNeutralFromBucket(),

        frameFilenames: [], //will be a collection of png images filenames that in the end gets converted to a gif

        //This determines the final image contents
        //The effect array is super important
        //Understanding effects is key to running this program.
        effects: generatePrimaryEffects(),
        finalImageEffects: generateFinalImageEffects(),
        finalFileName: config.finalFileName,
    }

    //For console info
    console.log(composeInfo(config, context.effects, context.finalImageEffects));

    ////////////////////////
    //ANIMATE - start here
    //Outer most layer of the function
    //Here we create all the frames in order
    ////////////////////////
    for (let f = 0; f < config.numberOfFrame; f = f + config.frameInc) {
        console.log("started " + f.toString() + " frame");
        await createSingleFrame(f, context);
        timeLeft(config.startTime, f, config.frameInc, config.numberOfFrame);
        console.log("completed " + f.toString() + " frame");
    }

    ////////////////////////
    //WRITE TO FILE
    ////////////////////////
    writeArtistCard(config, context.effects, context.finalImageEffects);
    await writeToMp4(context.workingDirectory + config.finalFileName + '-frame-%d.png', config);
    await writeScreenCap(context.frameFilenames[0], config);

    for (let f = 0; f < context.frameFilenames.length; f++) {
        //delete files
        fs.unlinkSync(context.frameFilenames[f]);
    }
}