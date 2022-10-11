/**

 The Gaston of functions.  This runs almost everything.

 Given a range, and the number of times the sequence is to repeat
 return the current value for the given frame in a total number of
 frames.

 **/
export const findValue = (min, max, times, totalFrame, currentFrame, invert = false) => {
    const range = max - min; //the range
    const segment = totalFrame / times;  //Segment is the number of frames if we only did the effect once
    const halfSegment = segment / 2;  //number of frame to go up and back with in a given time
    //the magic: frame segment is the current frame number if we only did this one time. Modulus operator
    const frameSegment = currentFrame % segment;
    const step = range / halfSegment; //How much to increment in a single frame

    if (!invert) { //the classic gaston
        if (frameSegment <= halfSegment) { //if we haven't reached the midway point
            //bottom of range plus how much to increment per frame times the current frame for the segment
            return min + (step * frameSegment);
        }

        //we are past the halfway point
        //max of the range minus how much to increment per frame times the current frame in reverse
        return max - (step * (frameSegment - halfSegment));
    }

    //THE INVERTED GASTON
    if (frameSegment <= halfSegment) { //if we haven't reached the midway point
        //Top of range MINUS how much to increment per frame times the current frame for the segment
        return max - (step * frameSegment);
    }

    //we are past the halfway point
    //bottom of the range PLUS how much to increment per frame times the current frame in reverse
    return min + (step * (frameSegment - halfSegment));
}
