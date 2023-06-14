import type { Document } from './bson';
import { BSONValue } from './bson_value';
import type { EJSONOptions } from './extended_json';
import type { ObjectId } from './objectid';
/** @public */
export interface DBRefLike {
    $ref: string;
    $id: ObjectId;
    $db?: string;
}
/** @internal */
export declare function isDBRefLike(value: unknown): value is DBRefLike;
/**
 * A class representation of the BSON DBRef type.
 * @public
 * @category BSONType
 */
export declare class DBRef extends BSONValue {
    get _bsontype(): 'DBRef';
    collection: string;
    oid: ObjectId;
    db?: string;
    fields: Document;
    /**
     * @param collection - the collection name.
     * @param oid - the reference ObjectId.
     * @param db - optional db name, if omitted the reference is local to the current db.
     */
    constructor(collection: string, oid: ObjectId, db?: string, fields?: Document);
    /** @internal */
    get namespace(): string;
    set namespace(value: string);
    toJSON(): DBRefLike & Document;
    /** @internal */
    toExtendedJSON(options?: EJSONOptions): DBRefLike;
    /** @internal */
    static fromExtendedJSON(doc: DBRefLike): DBRef;
    inspect(): string;
}
//# sourceMappingURL=db_ref.d.ts.map