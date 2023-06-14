/** @internal */
export declare const BSON_MAJOR_VERSION: 5;
/** @internal */
export declare const BSON_INT32_MAX = 2147483647;
/** @internal */
export declare const BSON_INT32_MIN = -2147483648;
/** @internal */
export declare const BSON_INT64_MAX: number;
/** @internal */
export declare const BSON_INT64_MIN: number;
/**
 * Any integer up to 2^53 can be precisely represented by a double.
 * @internal
 */
export declare const JS_INT_MAX: number;
/**
 * Any integer down to -2^53 can be precisely represented by a double.
 * @internal
 */
export declare const JS_INT_MIN: number;
/** Number BSON Type @internal */
export declare const BSON_DATA_NUMBER = 1;
/** String BSON Type @internal */
export declare const BSON_DATA_STRING = 2;
/** Object BSON Type @internal */
export declare const BSON_DATA_OBJECT = 3;
/** Array BSON Type @internal */
export declare const BSON_DATA_ARRAY = 4;
/** Binary BSON Type @internal */
export declare const BSON_DATA_BINARY = 5;
/** Binary BSON Type @internal */
export declare const BSON_DATA_UNDEFINED = 6;
/** ObjectId BSON Type @internal */
export declare const BSON_DATA_OID = 7;
/** Boolean BSON Type @internal */
export declare const BSON_DATA_BOOLEAN = 8;
/** Date BSON Type @internal */
export declare const BSON_DATA_DATE = 9;
/** null BSON Type @internal */
export declare const BSON_DATA_NULL = 10;
/** RegExp BSON Type @internal */
export declare const BSON_DATA_REGEXP = 11;
/** Code BSON Type @internal */
export declare const BSON_DATA_DBPOINTER = 12;
/** Code BSON Type @internal */
export declare const BSON_DATA_CODE = 13;
/** Symbol BSON Type @internal */
export declare const BSON_DATA_SYMBOL = 14;
/** Code with Scope BSON Type @internal */
export declare const BSON_DATA_CODE_W_SCOPE = 15;
/** 32 bit Integer BSON Type @internal */
export declare const BSON_DATA_INT = 16;
/** Timestamp BSON Type @internal */
export declare const BSON_DATA_TIMESTAMP = 17;
/** Long BSON Type @internal */
export declare const BSON_DATA_LONG = 18;
/** Decimal128 BSON Type @internal */
export declare const BSON_DATA_DECIMAL128 = 19;
/** MinKey BSON Type @internal */
export declare const BSON_DATA_MIN_KEY = 255;
/** MaxKey BSON Type @internal */
export declare const BSON_DATA_MAX_KEY = 127;
/** Binary Default Type @internal */
export declare const BSON_BINARY_SUBTYPE_DEFAULT = 0;
/** Binary Function Type @internal */
export declare const BSON_BINARY_SUBTYPE_FUNCTION = 1;
/** Binary Byte Array Type @internal */
export declare const BSON_BINARY_SUBTYPE_BYTE_ARRAY = 2;
/** Binary Deprecated UUID Type @deprecated Please use BSON_BINARY_SUBTYPE_UUID_NEW @internal */
export declare const BSON_BINARY_SUBTYPE_UUID = 3;
/** Binary UUID Type @internal */
export declare const BSON_BINARY_SUBTYPE_UUID_NEW = 4;
/** Binary MD5 Type @internal */
export declare const BSON_BINARY_SUBTYPE_MD5 = 5;
/** Encrypted BSON type @internal */
export declare const BSON_BINARY_SUBTYPE_ENCRYPTED = 6;
/** Column BSON type @internal */
export declare const BSON_BINARY_SUBTYPE_COLUMN = 7;
/** Binary User Defined Type @internal */
export declare const BSON_BINARY_SUBTYPE_USER_DEFINED = 128;
/** @public */
export declare const BSONType: Readonly<{
    readonly double: 1;
    readonly string: 2;
    readonly object: 3;
    readonly array: 4;
    readonly binData: 5;
    readonly undefined: 6;
    readonly objectId: 7;
    readonly bool: 8;
    readonly date: 9;
    readonly null: 10;
    readonly regex: 11;
    readonly dbPointer: 12;
    readonly javascript: 13;
    readonly symbol: 14;
    readonly javascriptWithScope: 15;
    readonly int: 16;
    readonly timestamp: 17;
    readonly long: 18;
    readonly decimal: 19;
    readonly minKey: -1;
    readonly maxKey: 127;
}>;
/** @public */
export type BSONType = (typeof BSONType)[keyof typeof BSONType];
//# sourceMappingURL=constants.d.ts.map