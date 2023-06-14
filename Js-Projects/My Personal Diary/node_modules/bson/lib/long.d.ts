import { BSONValue } from './bson_value';
import type { EJSONOptions } from './extended_json';
import type { Timestamp } from './timestamp';
/** @public */
export interface LongExtended {
    $numberLong: string;
}
/**
 * A class representing a 64-bit integer
 * @public
 * @category BSONType
 * @remarks
 * The internal representation of a long is the two given signed, 32-bit values.
 * We use 32-bit pieces because these are the size of integers on which
 * Javascript performs bit-operations.  For operations like addition and
 * multiplication, we split each number into 16 bit pieces, which can easily be
 * multiplied within Javascript's floating-point representation without overflow
 * or change in sign.
 * In the algorithms below, we frequently reduce the negative case to the
 * positive case by negating the input(s) and then post-processing the result.
 * Note that we must ALWAYS check specially whether those values are MIN_VALUE
 * (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
 * a positive number, it overflows back into a negative).  Not handling this
 * case would often result in infinite recursion.
 * Common constant values ZERO, ONE, NEG_ONE, etc. are found as static properties on this class.
 */
export declare class Long extends BSONValue {
    get _bsontype(): 'Long';
    /** An indicator used to reliably determine if an object is a Long or not. */
    get __isLong__(): boolean;
    /**
     * The high 32 bits as a signed value.
     */
    high: number;
    /**
     * The low 32 bits as a signed value.
     */
    low: number;
    /**
     * Whether unsigned or not.
     */
    unsigned: boolean;
    /**
     * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
     *  See the from* functions below for more convenient ways of constructing Longs.
     *
     * Acceptable signatures are:
     * - Long(low, high, unsigned?)
     * - Long(bigint, unsigned?)
     * - Long(string, unsigned?)
     *
     * @param low - The low (signed) 32 bits of the long
     * @param high - The high (signed) 32 bits of the long
     * @param unsigned - Whether unsigned or not, defaults to signed
     */
    constructor(low?: number | bigint | string, high?: number | boolean, unsigned?: boolean);
    static TWO_PWR_24: Long;
    /** Maximum unsigned value. */
    static MAX_UNSIGNED_VALUE: Long;
    /** Signed zero */
    static ZERO: Long;
    /** Unsigned zero. */
    static UZERO: Long;
    /** Signed one. */
    static ONE: Long;
    /** Unsigned one. */
    static UONE: Long;
    /** Signed negative one. */
    static NEG_ONE: Long;
    /** Maximum signed value. */
    static MAX_VALUE: Long;
    /** Minimum signed value. */
    static MIN_VALUE: Long;
    /**
     * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits.
     * Each is assumed to use 32 bits.
     * @param lowBits - The low 32 bits
     * @param highBits - The high 32 bits
     * @param unsigned - Whether unsigned or not, defaults to signed
     * @returns The corresponding Long value
     */
    static fromBits(lowBits: number, highBits: number, unsigned?: boolean): Long;
    /**
     * Returns a Long representing the given 32 bit integer value.
     * @param value - The 32 bit integer in question
     * @param unsigned - Whether unsigned or not, defaults to signed
     * @returns The corresponding Long value
     */
    static fromInt(value: number, unsigned?: boolean): Long;
    /**
     * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
     * @param value - The number in question
     * @param unsigned - Whether unsigned or not, defaults to signed
     * @returns The corresponding Long value
     */
    static fromNumber(value: number, unsigned?: boolean): Long;
    /**
     * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
     * @param value - The number in question
     * @param unsigned - Whether unsigned or not, defaults to signed
     * @returns The corresponding Long value
     */
    static fromBigInt(value: bigint, unsigned?: boolean): Long;
    /**
     * Returns a Long representation of the given string, written using the specified radix.
     * @param str - The textual representation of the Long
     * @param unsigned - Whether unsigned or not, defaults to signed
     * @param radix - The radix in which the text is written (2-36), defaults to 10
     * @returns The corresponding Long value
     */
    static fromString(str: string, unsigned?: boolean, radix?: number): Long;
    /**
     * Creates a Long from its byte representation.
     * @param bytes - Byte representation
     * @param unsigned - Whether unsigned or not, defaults to signed
     * @param le - Whether little or big endian, defaults to big endian
     * @returns The corresponding Long value
     */
    static fromBytes(bytes: number[], unsigned?: boolean, le?: boolean): Long;
    /**
     * Creates a Long from its little endian byte representation.
     * @param bytes - Little endian byte representation
     * @param unsigned - Whether unsigned or not, defaults to signed
     * @returns The corresponding Long value
     */
    static fromBytesLE(bytes: number[], unsigned?: boolean): Long;
    /**
     * Creates a Long from its big endian byte representation.
     * @param bytes - Big endian byte representation
     * @param unsigned - Whether unsigned or not, defaults to signed
     * @returns The corresponding Long value
     */
    static fromBytesBE(bytes: number[], unsigned?: boolean): Long;
    /**
     * Tests if the specified object is a Long.
     */
    static isLong(value: unknown): value is Long;
    /**
     * Converts the specified value to a Long.
     * @param unsigned - Whether unsigned or not, defaults to signed
     */
    static fromValue(val: number | string | {
        low: number;
        high: number;
        unsigned?: boolean;
    }, unsigned?: boolean): Long;
    /** Returns the sum of this and the specified Long. */
    add(addend: string | number | Long | Timestamp): Long;
    /**
     * Returns the sum of this and the specified Long.
     * @returns Sum
     */
    and(other: string | number | Long | Timestamp): Long;
    /**
     * Compares this Long's value with the specified's.
     * @returns 0 if they are the same, 1 if the this is greater and -1 if the given one is greater
     */
    compare(other: string | number | Long | Timestamp): 0 | 1 | -1;
    /** This is an alias of {@link Long.compare} */
    comp(other: string | number | Long | Timestamp): 0 | 1 | -1;
    /**
     * Returns this Long divided by the specified. The result is signed if this Long is signed or unsigned if this Long is unsigned.
     * @returns Quotient
     */
    divide(divisor: string | number | Long | Timestamp): Long;
    /**This is an alias of {@link Long.divide} */
    div(divisor: string | number | Long | Timestamp): Long;
    /**
     * Tests if this Long's value equals the specified's.
     * @param other - Other value
     */
    equals(other: string | number | Long | Timestamp): boolean;
    /** This is an alias of {@link Long.equals} */
    eq(other: string | number | Long | Timestamp): boolean;
    /** Gets the high 32 bits as a signed integer. */
    getHighBits(): number;
    /** Gets the high 32 bits as an unsigned integer. */
    getHighBitsUnsigned(): number;
    /** Gets the low 32 bits as a signed integer. */
    getLowBits(): number;
    /** Gets the low 32 bits as an unsigned integer. */
    getLowBitsUnsigned(): number;
    /** Gets the number of bits needed to represent the absolute value of this Long. */
    getNumBitsAbs(): number;
    /** Tests if this Long's value is greater than the specified's. */
    greaterThan(other: string | number | Long | Timestamp): boolean;
    /** This is an alias of {@link Long.greaterThan} */
    gt(other: string | number | Long | Timestamp): boolean;
    /** Tests if this Long's value is greater than or equal the specified's. */
    greaterThanOrEqual(other: string | number | Long | Timestamp): boolean;
    /** This is an alias of {@link Long.greaterThanOrEqual} */
    gte(other: string | number | Long | Timestamp): boolean;
    /** This is an alias of {@link Long.greaterThanOrEqual} */
    ge(other: string | number | Long | Timestamp): boolean;
    /** Tests if this Long's value is even. */
    isEven(): boolean;
    /** Tests if this Long's value is negative. */
    isNegative(): boolean;
    /** Tests if this Long's value is odd. */
    isOdd(): boolean;
    /** Tests if this Long's value is positive. */
    isPositive(): boolean;
    /** Tests if this Long's value equals zero. */
    isZero(): boolean;
    /** Tests if this Long's value is less than the specified's. */
    lessThan(other: string | number | Long | Timestamp): boolean;
    /** This is an alias of {@link Long#lessThan}. */
    lt(other: string | number | Long | Timestamp): boolean;
    /** Tests if this Long's value is less than or equal the specified's. */
    lessThanOrEqual(other: string | number | Long | Timestamp): boolean;
    /** This is an alias of {@link Long.lessThanOrEqual} */
    lte(other: string | number | Long | Timestamp): boolean;
    /** Returns this Long modulo the specified. */
    modulo(divisor: string | number | Long | Timestamp): Long;
    /** This is an alias of {@link Long.modulo} */
    mod(divisor: string | number | Long | Timestamp): Long;
    /** This is an alias of {@link Long.modulo} */
    rem(divisor: string | number | Long | Timestamp): Long;
    /**
     * Returns the product of this and the specified Long.
     * @param multiplier - Multiplier
     * @returns Product
     */
    multiply(multiplier: string | number | Long | Timestamp): Long;
    /** This is an alias of {@link Long.multiply} */
    mul(multiplier: string | number | Long | Timestamp): Long;
    /** Returns the Negation of this Long's value. */
    negate(): Long;
    /** This is an alias of {@link Long.negate} */
    neg(): Long;
    /** Returns the bitwise NOT of this Long. */
    not(): Long;
    /** Tests if this Long's value differs from the specified's. */
    notEquals(other: string | number | Long | Timestamp): boolean;
    /** This is an alias of {@link Long.notEquals} */
    neq(other: string | number | Long | Timestamp): boolean;
    /** This is an alias of {@link Long.notEquals} */
    ne(other: string | number | Long | Timestamp): boolean;
    /**
     * Returns the bitwise OR of this Long and the specified.
     */
    or(other: number | string | Long): Long;
    /**
     * Returns this Long with bits shifted to the left by the given amount.
     * @param numBits - Number of bits
     * @returns Shifted Long
     */
    shiftLeft(numBits: number | Long): Long;
    /** This is an alias of {@link Long.shiftLeft} */
    shl(numBits: number | Long): Long;
    /**
     * Returns this Long with bits arithmetically shifted to the right by the given amount.
     * @param numBits - Number of bits
     * @returns Shifted Long
     */
    shiftRight(numBits: number | Long): Long;
    /** This is an alias of {@link Long.shiftRight} */
    shr(numBits: number | Long): Long;
    /**
     * Returns this Long with bits logically shifted to the right by the given amount.
     * @param numBits - Number of bits
     * @returns Shifted Long
     */
    shiftRightUnsigned(numBits: Long | number): Long;
    /** This is an alias of {@link Long.shiftRightUnsigned} */
    shr_u(numBits: number | Long): Long;
    /** This is an alias of {@link Long.shiftRightUnsigned} */
    shru(numBits: number | Long): Long;
    /**
     * Returns the difference of this and the specified Long.
     * @param subtrahend - Subtrahend
     * @returns Difference
     */
    subtract(subtrahend: string | number | Long | Timestamp): Long;
    /** This is an alias of {@link Long.subtract} */
    sub(subtrahend: string | number | Long | Timestamp): Long;
    /** Converts the Long to a 32 bit integer, assuming it is a 32 bit integer. */
    toInt(): number;
    /** Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa). */
    toNumber(): number;
    /** Converts the Long to a BigInt (arbitrary precision). */
    toBigInt(): bigint;
    /**
     * Converts this Long to its byte representation.
     * @param le - Whether little or big endian, defaults to big endian
     * @returns Byte representation
     */
    toBytes(le?: boolean): number[];
    /**
     * Converts this Long to its little endian byte representation.
     * @returns Little endian byte representation
     */
    toBytesLE(): number[];
    /**
     * Converts this Long to its big endian byte representation.
     * @returns Big endian byte representation
     */
    toBytesBE(): number[];
    /**
     * Converts this Long to signed.
     */
    toSigned(): Long;
    /**
     * Converts the Long to a string written in the specified radix.
     * @param radix - Radix (2-36), defaults to 10
     * @throws RangeError If `radix` is out of range
     */
    toString(radix?: number): string;
    /** Converts this Long to unsigned. */
    toUnsigned(): Long;
    /** Returns the bitwise XOR of this Long and the given one. */
    xor(other: Long | number | string): Long;
    /** This is an alias of {@link Long.isZero} */
    eqz(): boolean;
    /** This is an alias of {@link Long.lessThanOrEqual} */
    le(other: string | number | Long | Timestamp): boolean;
    toExtendedJSON(options?: EJSONOptions): number | LongExtended;
    static fromExtendedJSON(doc: {
        $numberLong: string;
    }, options?: EJSONOptions): number | Long | bigint;
    inspect(): string;
}
//# sourceMappingURL=long.d.ts.map