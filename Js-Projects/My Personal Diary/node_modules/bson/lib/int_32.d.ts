import { BSONValue } from './bson_value';
import type { EJSONOptions } from './extended_json';
/** @public */
export interface Int32Extended {
    $numberInt: string;
}
/**
 * A class representation of a BSON Int32 type.
 * @public
 * @category BSONType
 */
export declare class Int32 extends BSONValue {
    get _bsontype(): 'Int32';
    value: number;
    /**
     * Create an Int32 type
     *
     * @param value - the number we want to represent as an int32.
     */
    constructor(value: number | string);
    /**
     * Access the number value.
     *
     * @returns returns the wrapped int32 number.
     */
    valueOf(): number;
    toString(radix?: number): string;
    toJSON(): number;
    /** @internal */
    toExtendedJSON(options?: EJSONOptions): number | Int32Extended;
    /** @internal */
    static fromExtendedJSON(doc: Int32Extended, options?: EJSONOptions): number | Int32;
    inspect(): string;
}
//# sourceMappingURL=int_32.d.ts.map