import { BSONValue } from './bson_value';
/** @public */
export interface MinKeyExtended {
    $minKey: 1;
}
/**
 * A class representation of the BSON MinKey type.
 * @public
 * @category BSONType
 */
export declare class MinKey extends BSONValue {
    get _bsontype(): 'MinKey';
    /** @internal */
    toExtendedJSON(): MinKeyExtended;
    /** @internal */
    static fromExtendedJSON(): MinKey;
    inspect(): string;
}
//# sourceMappingURL=min_key.d.ts.map