import { BSONValue } from './bson_value';
import type { EJSONOptions } from './extended_json';
/** @public */
export interface BSONRegExpExtendedLegacy {
    $regex: string | BSONRegExp;
    $options: string;
}
/** @public */
export interface BSONRegExpExtended {
    $regularExpression: {
        pattern: string;
        options: string;
    };
}
/**
 * A class representation of the BSON RegExp type.
 * @public
 * @category BSONType
 */
export declare class BSONRegExp extends BSONValue {
    get _bsontype(): 'BSONRegExp';
    pattern: string;
    options: string;
    /**
     * @param pattern - The regular expression pattern to match
     * @param options - The regular expression options
     */
    constructor(pattern: string, options?: string);
    static parseOptions(options?: string): string;
    /** @internal */
    toExtendedJSON(options?: EJSONOptions): BSONRegExpExtendedLegacy | BSONRegExpExtended;
    /** @internal */
    static fromExtendedJSON(doc: BSONRegExpExtendedLegacy | BSONRegExpExtended): BSONRegExp;
    inspect(): string;
}
//# sourceMappingURL=regexp.d.ts.map