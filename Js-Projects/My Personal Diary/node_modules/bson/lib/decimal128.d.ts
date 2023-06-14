import { BSONValue } from './bson_value';
/** @public */
export interface Decimal128Extended {
    $numberDecimal: string;
}
/**
 * A class representation of the BSON Decimal128 type.
 * @public
 * @category BSONType
 */
export declare class Decimal128 extends BSONValue {
    get _bsontype(): 'Decimal128';
    readonly bytes: Uint8Array;
    /**
     * @param bytes - a buffer containing the raw Decimal128 bytes in little endian order,
     *                or a string representation as returned by .toString()
     */
    constructor(bytes: Uint8Array | string);
    /**
     * Create a Decimal128 instance from a string representation
     *
     * @param representation - a numeric string representation.
     */
    static fromString(representation: string): Decimal128;
    /** Create a string representation of the raw Decimal128 value */
    toString(): string;
    toJSON(): Decimal128Extended;
    /** @internal */
    toExtendedJSON(): Decimal128Extended;
    /** @internal */
    static fromExtendedJSON(doc: Decimal128Extended): Decimal128;
    inspect(): string;
}
//# sourceMappingURL=decimal128.d.ts.map