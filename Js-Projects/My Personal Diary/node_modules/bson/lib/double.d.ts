import { BSONValue } from './bson_value';
import type { EJSONOptions } from './extended_json';
/** @public */
export interface DoubleExtended {
    $numberDouble: string;
}
/**
 * A class representation of the BSON Double type.
 * @public
 * @category BSONType
 */
export declare class Double extends BSONValue {
    get _bsontype(): 'Double';
    value: number;
    /**
     * Create a Double type
     *
     * @param value - the number we want to represent as a double.
     */
    constructor(value: number);
    /**
     * Access the number value.
     *
     * @returns returns the wrapped double number.
     */
    valueOf(): number;
    toJSON(): number;
    toString(radix?: number): string;
    /** @internal */
    toExtendedJSON(options?: EJSONOptions): number | DoubleExtended;
    /** @internal */
    static fromExtendedJSON(doc: DoubleExtended, options?: EJSONOptions): number | Double;
    inspect(): string;
}
//# sourceMappingURL=double.d.ts.map