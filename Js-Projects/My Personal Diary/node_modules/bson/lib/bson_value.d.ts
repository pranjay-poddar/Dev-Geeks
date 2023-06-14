/** @public */
export declare abstract class BSONValue {
    /** @public */
    abstract get _bsontype(): string;
    /** @public */
    abstract inspect(): string;
    /** @internal */
    abstract toExtendedJSON(): unknown;
}
//# sourceMappingURL=bson_value.d.ts.map