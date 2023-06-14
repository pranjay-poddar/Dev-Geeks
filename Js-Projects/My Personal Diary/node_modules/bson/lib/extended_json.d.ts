import type { Document } from './bson';
/** @public */
export type EJSONOptions = {
    /**
     * Output using the Extended JSON v1 spec
     * @defaultValue `false`
     */
    legacy?: boolean;
    /**
     * Enable Extended JSON's `relaxed` mode, which attempts to return native JS types where possible, rather than BSON types
     * @defaultValue `false` */
    relaxed?: boolean;
    /**
     * Enable native bigint support
     * @defaultValue `false`
     */
    useBigInt64?: boolean;
};
/**
 * Parse an Extended JSON string, constructing the JavaScript value or object described by that
 * string.
 *
 * @example
 * ```js
 * const { EJSON } = require('bson');
 * const text = '{ "int32": { "$numberInt": "10" } }';
 *
 * // prints { int32: { [String: '10'] _bsontype: 'Int32', value: '10' } }
 * console.log(EJSON.parse(text, { relaxed: false }));
 *
 * // prints { int32: 10 }
 * console.log(EJSON.parse(text));
 * ```
 */
declare function parse(text: string, options?: EJSONOptions): any;
/**
 * Converts a BSON document to an Extended JSON string, optionally replacing values if a replacer
 * function is specified or optionally including only the specified properties if a replacer array
 * is specified.
 *
 * @param value - The value to convert to extended JSON
 * @param replacer - A function that alters the behavior of the stringification process, or an array of String and Number objects that serve as a whitelist for selecting/filtering the properties of the value object to be included in the JSON string. If this value is null or not provided, all properties of the object are included in the resulting JSON string
 * @param space - A String or Number object that's used to insert white space into the output JSON string for readability purposes.
 * @param options - Optional settings
 *
 * @example
 * ```js
 * const { EJSON } = require('bson');
 * const Int32 = require('mongodb').Int32;
 * const doc = { int32: new Int32(10) };
 *
 * // prints '{"int32":{"$numberInt":"10"}}'
 * console.log(EJSON.stringify(doc, { relaxed: false }));
 *
 * // prints '{"int32":10}'
 * console.log(EJSON.stringify(doc));
 * ```
 */
declare function stringify(value: any, replacer?: (number | string)[] | ((this: any, key: string, value: any) => any) | EJSONOptions, space?: string | number, options?: EJSONOptions): string;
/**
 * Serializes an object to an Extended JSON string, and reparse it as a JavaScript object.
 *
 * @param value - The object to serialize
 * @param options - Optional settings passed to the `stringify` function
 */
declare function EJSONserialize(value: any, options?: EJSONOptions): Document;
/**
 * Deserializes an Extended JSON object into a plain JavaScript object with native/BSON types
 *
 * @param ejson - The Extended JSON object to deserialize
 * @param options - Optional settings passed to the parse method
 */
declare function EJSONdeserialize(ejson: Document, options?: EJSONOptions): any;
/** @public */
declare const EJSON: {
    parse: typeof parse;
    stringify: typeof stringify;
    serialize: typeof EJSONserialize;
    deserialize: typeof EJSONdeserialize;
};
export { EJSON };
//# sourceMappingURL=extended_json.d.ts.map