/**
 Given a range return the current value for the given frame in a total number of
 frames.
 **/
export const findOneWayValue = (min, max, totalFrame, currentFrame, invert = false) => {
    const range = max - min; //the range
    const step = range / totalFrame; //How much to increment in a single frame

    if (!invert) {
        return min + (step * currentFrame); //bottom to top of range
    }

    return max - (step * currentFrame); //top to bottom of range
}
