"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is2D = exports.hasPropType = exports.hasProp = void 0;
/**
 * Checks if a given object has a property with a given name.
 *
 * Example invocation:
 * ```js
 * let obj = { 'foo': 'bar', 'baz': () => {} }
 * hasProp(obj, 'foo') // true
 * hasProp(obj, 'baz') // true
 * hasProp(obj, 'abc') // false
 * ```
 *
 * @param obj An object to test
 * @param prop The name of the property
 */
function hasProp(obj, prop) {
    return obj !== undefined && prop in obj;
}
exports.hasProp = hasProp;
/**
 * Checks if a given object has a property with a given name.
 * Furthermore performs a `typeof` check on the property if it exists.
 *
 * Example invocation:
 * ```js
 * let obj = { 'foo': 'bar', 'baz': () => {} }
 * hasPropType(obj, 'foo', 'string') // true
 * hasPropType(obj, 'baz', 'function') // true
 * hasPropType(obj, 'abc', 'number') // false
 * ```
 *
 * @param obj An object to test
 * @param prop The name of the property
 * @param type The type the property is expected to have
 */
function hasPropType(obj, prop, type) {
    return hasProp(obj, prop) && type === typeof obj[prop];
}
exports.hasPropType = hasPropType;
/**
 * Checks if the supplied array has two dimensions or not.
 *
 * Example invocations:
 * is2D([]) // false
 * is2D([[]]) // true
 * is2D([[], []]) // true
 * is2D([42]) // false
 *
 * @param arr an array with one or two dimensions
 */
function is2D(arr) {
    return Array.isArray(arr[0]);
}
exports.is2D = is2D;
