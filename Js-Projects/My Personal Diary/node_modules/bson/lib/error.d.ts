/**
 * @public
 * @category Error
 *
 * `BSONError` objects are thrown when BSON ecounters an error.
 *
 * This is the parent class for all the other errors thrown by this library.
 */
export declare class BSONError extends Error {
    /**
     * @internal
     * The underlying algorithm for isBSONError may change to improve how strict it is
     * about determining if an input is a BSONError. But it must remain backwards compatible
     * with previous minors & patches of the current major version.
     */
    protected get bsonError(): true;
    get name(): string;
    constructor(message: string);
    /**
     * @public
     *
     * All errors thrown from the BSON library inherit from `BSONError`.
     * This method can assist with determining if an error originates from the BSON library
     * even if it does not pass an `instanceof` check against this class' constructor.
     *
     * @param value - any javascript value that needs type checking
     */
    static isBSONError(value: unknown): value is BSONError;
}
/**
 * @public
 * @category Error
 */
export declare class BSONVersionError extends BSONError {
    get name(): 'BSONVersionError';
    constructor();
}
/**
 * @public
 * @category Error
 *
 * An error generated when BSON functions encounter an unexpected input
 * or reaches an unexpected/invalid internal state
 *
 */
export declare class BSONRuntimeError extends BSONError {
    get name(): 'BSONRuntimeError';
    constructor(message: string);
}
//# sourceMappingURL=error.d.ts.map