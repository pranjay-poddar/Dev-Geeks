import {Canvas2dFactory} from "../../core/factory/canvas/Canvas2dFactory.js";

/**
 *
 * @param draw - a draw function that produces a file from context.drawing property and context.underlayName property
 * @param context - holds information relevant to creating the drawing
 *
 *  this is still probably a bad idea...
 *  update: this was a terrible idea
 *  plan: refactor context into a class which I need to do anyway
 *  invert the process draw call into the context
 *
 *  Later update:  Maybe not the worst idea, just a not well-thought-out and buggy one...
 *  I really need to figure out a context class that handles:
 *
 *  Standardizes all the context data from the effects
 *  has processDrawFunction as an internal method
 *  has compositeImage as an internal method
 *
 *  Maybe takes an effect?
 *
 *  Should I splice this new context class into the Effect class?
 *
 *  Time will tell...
 *
 */
export const processDrawFunction = async (draw, context) => {

    await draw(context, context.underlayName);

    if (context.theAccentGaston > 0) {
        context.theAccentGaston = 0;
    }

    if (context.useAccentGaston) {
        context.useAccentGaston = false;
    }

    context.canvas = await Canvas2dFactory.getNewCanvas(context.data.width, context.data.height);
    await draw(context, context.drawing);
}