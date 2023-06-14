import { Long } from './long';
/** @public */
export type TimestampOverrides = '_bsontype' | 'toExtendedJSON' | 'fromExtendedJSON' | 'inspect';
/** @public */
export type LongWithoutOverrides = new (low: unknown, high?: number | boolean, unsigned?: boolean) => {
    [P in Exclude<keyof Long, TimestampOverrides>]: Long[P];
};
/** @public */
export declare const LongWithoutOverridesClass: LongWithoutOverrides;
/** @public */
export interface TimestampExtended {
    $timestamp: {
        t: number;
        i: number;
    };
}
/**
 * @public
 * @category BSONType
 */
export declare class Timestamp extends LongWithoutOverridesClass {
    get _bsontype(): 'Timestamp';
    static readonly MAX_VALUE: Long;
    /**
     * @param int - A 64-bit bigint representing the Timestamp.
     */
    constructor(int: bigint);
    /**
     * @param long - A 64-bit Long representing the Timestamp.
     */
    constructor(long: Long);
    /**
     * @param value - A pair of two values indicating timestamp and increment.
     */
    constructor(value: {
        t: number;
        i: number;
    });
    toJSON(): {
        $timestamp: string;
    };
    /** Returns a Timestamp represented by the given (32-bit) integer value. */
    static fromInt(value: number): Timestamp;
    /** Returns a Timestamp representing the given number value, provided that it is a finite number. Otherwise, zero is returned. */
    static fromNumber(value: number): Timestamp;
    /**
     * Returns a Timestamp for the given high and low bits. Each is assumed to use 32 bits.
     *
     * @param lowBits - the low 32-bits.
     * @param highBits - the high 32-bits.
     */
    static fromBits(lowBits: number, highBits: number): Timestamp;
    /**
     * Returns a Timestamp from the given string, optionally using the given radix.
     *
     * @param str - the textual representation of the Timestamp.
     * @param optRadix - the radix in which the text is written.
     */
    static fromString(str: string, optRadix: number): Timestamp;
    /** @internal */
    toExtendedJSON(): TimestampExtended;
    /** @internal */
    static fromExtendedJSON(doc: TimestampExtended): Timestamp;
    inspect(): string;
}
//# sourceMappingURL=timestamp.d.ts.map