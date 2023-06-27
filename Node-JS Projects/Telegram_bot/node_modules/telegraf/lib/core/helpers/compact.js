"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compactOptions = void 0;
function compactOptions(options) {
    if (!options) {
        return options;
    }
    const keys = Object.keys(options);
    const compactKeys = keys.filter((key) => options[key] !== undefined);
    const compactEntries = compactKeys.map((key) => [key, options[key]]);
    return Object.fromEntries(compactEntries);
}
exports.compactOptions = compactOptions;
