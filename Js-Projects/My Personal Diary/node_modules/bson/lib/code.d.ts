import type { Document } from './bson';
import { BSONValue } from './bson_value';
/** @public */
export interface CodeExtended {
    $code: string;
    $scope?: Document;
}
/**
 * A class representation of the BSON Code type.
 * @public
 * @category BSONType
 */
export declare class Code extends BSONValue {
    get _bsontype(): 'Code';
    code: string;
    scope: Document | null;
    /**
     * @param code - a string or function.
     * @param scope - an optional scope for the function.
     */
    constructor(code: string | Function, scope?: Document | null);
    toJSON(): {
        code: string;
        scope?: Document;
    };
    /** @internal */
    toExtendedJSON(): CodeExtended;
    /** @internal */
    static fromExtendedJSON(doc: CodeExtended): Code;
    inspect(): string;
}
//# sourceMappingURL=code.d.ts.map