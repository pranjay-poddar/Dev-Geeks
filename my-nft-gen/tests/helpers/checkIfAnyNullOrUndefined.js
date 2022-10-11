export const checkIfAnyNullOrUndefined = (obj) => {
    return Object.values(obj).some(value => {
        return value === null || value === undefined;
    });
}