/////////////////
// https://stackoverflow.com/a/5732390
/////////////////
export const mapNumberToRange = (numberToMap, inputRangeStart, inputRangeEnd, outputRangeStart, outputRangeEnd) => {

    const slope = 1.0 * (outputRangeEnd - outputRangeStart) / (inputRangeEnd - inputRangeStart)

    return outputRangeStart + slope * (numberToMap - inputRangeStart)

}