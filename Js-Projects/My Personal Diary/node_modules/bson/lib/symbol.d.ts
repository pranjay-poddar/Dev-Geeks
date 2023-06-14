import { BSONValue } from './bson_value';
/** @public */
export interface BSONSymbolExtended {
    $symbol: string;
}
/**
 * A class representation of the BSON Symbol type.
 * @public
 * @category BSONType
 */
export declare class BSONSymbol extends BSONValue {
    get _bsontype(): 'BSONSymbol';
    value: string;
    /**
     * @param value - the string representing the symbol.
     */
    constructor(value: string);
    /** Access the wrapped string value. */
    valueOf(): string;
    toString(): string;
    inspect(): string;
    toJSON(): string;
    /** @internal */
    toExtendedJSON(): BSONSymbolExtended;
    /** @internal */
    static fromExtendedJSON(doc: BSONSymbolExtended): BSONSymbol;
}
//# sourceMappingURL=symbol.d.ts.map