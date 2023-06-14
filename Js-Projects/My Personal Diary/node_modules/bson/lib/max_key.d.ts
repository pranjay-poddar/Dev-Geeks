import { BSONValue } from './bson_value';
/** @public */
export interface MaxKeyExtended {
    $maxKey: 1;
}
/**
 * A class representation of the BSON MaxKey type.
 * @public
 * @category BSONType
 */
export declare class MaxKey extends BSONValue {
    get _bsontype(): 'MaxKey';
    /** @internal */
    toExtendedJSON(): MaxKeyExtended;
    /** @internal */
    static fromExtendedJSON(): MaxKey;
    inspect(): string;
}
//# sourceMappingURL=max_key.d.ts.map