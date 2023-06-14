import type { EJSONOptions } from './extended_json';
import { BSONValue } from './bson_value';
/** @public */
export type BinarySequence = Uint8Array | number[];
/** @public */
export interface BinaryExtendedLegacy {
    $type: string;
    $binary: string;
}
/** @public */
export interface BinaryExtended {
    $binary: {
        subType: string;
        base64: string;
    };
}
/**
 * A class representation of the BSON Binary type.
 * @public
 * @category BSONType
 */
export declare class Binary extends BSONValue {
    get _bsontype(): 'Binary';
    /**
     * Binary default subtype
     * @internal
     */
    private static readonly BSON_BINARY_SUBTYPE_DEFAULT;
    /** Initial buffer default size */
    static readonly BUFFER_SIZE = 256;
    /** Default BSON type */
    static readonly SUBTYPE_DEFAULT = 0;
    /** Function BSON type */
    static readonly SUBTYPE_FUNCTION = 1;
    /** Byte Array BSON type */
    static readonly SUBTYPE_BYTE_ARRAY = 2;
    /** Deprecated UUID BSON type @deprecated Please use SUBTYPE_UUID */
    static readonly SUBTYPE_UUID_OLD = 3;
    /** UUID BSON type */
    static readonly SUBTYPE_UUID = 4;
    /** MD5 BSON type */
    static readonly SUBTYPE_MD5 = 5;
    /** Encrypted BSON type */
    static readonly SUBTYPE_ENCRYPTED = 6;
    /** Column BSON type */
    static readonly SUBTYPE_COLUMN = 7;
    /** User BSON type */
    static readonly SUBTYPE_USER_DEFINED = 128;
    buffer: Uint8Array;
    sub_type: number;
    position: number;
    /**
     * Create a new Binary instance.
     *
     * This constructor can accept a string as its first argument. In this case,
     * this string will be encoded using ISO-8859-1, **not** using UTF-8.
     * This is almost certainly not what you want. Use `new Binary(Buffer.from(string))`
     * instead to convert the string to a Buffer using UTF-8 first.
     *
     * @param buffer - a buffer object containing the binary data.
     * @param subType - the option binary type.
     */
    constructor(buffer?: string | BinarySequence, subType?: number);
    /**
     * Updates this binary with byte_value.
     *
     * @param byteValue - a single byte we wish to write.
     */
    put(byteValue: string | number | Uint8Array | number[]): void;
    /**
     * Writes a buffer or string to the binary.
     *
     * @param sequence - a string or buffer to be written to the Binary BSON object.
     * @param offset - specify the binary of where to write the content.
     */
    write(sequence: string | BinarySequence, offset: number): void;
    /**
     * Reads **length** bytes starting at **position**.
     *
     * @param position - read from the given position in the Binary.
     * @param length - the number of bytes to read.
     */
    read(position: number, length: number): BinarySequence;
    /**
     * Returns the value of this binary as a string.
     * @param asRaw - Will skip converting to a string
     * @remarks
     * This is handy when calling this function conditionally for some key value pairs and not others
     */
    value(asRaw?: boolean): string | BinarySequence;
    /** the length of the binary sequence */
    length(): number;
    toJSON(): string;
    toString(encoding?: 'hex' | 'base64' | 'utf8' | 'utf-8'): string;
    /** @internal */
    toExtendedJSON(options?: EJSONOptions): BinaryExtendedLegacy | BinaryExtended;
    toUUID(): UUID;
    /** Creates an Binary instance from a hex digit string */
    static createFromHexString(hex: string, subType?: number): Binary;
    /** Creates an Binary instance from a base64 string */
    static createFromBase64(base64: string, subType?: number): Binary;
    /** @internal */
    static fromExtendedJSON(doc: BinaryExtendedLegacy | BinaryExtended | UUIDExtended, options?: EJSONOptions): Binary;
    inspect(): string;
}
/** @public */
export type UUIDExtended = {
    $uuid: string;
};
/**
 * A class representation of the BSON UUID type.
 * @public
 */
export declare class UUID extends Binary {
    /** @deprecated Hex string is no longer cached, this control will be removed in a future major release */
    static cacheHexString: boolean;
    /**
     * Create a UUID type
     *
     * When the argument to the constructor is omitted a random v4 UUID will be generated.
     *
     * @param input - Can be a 32 or 36 character hex string (dashes excluded/included) or a 16 byte binary Buffer.
     */
    constructor(input?: string | Uint8Array | UUID);
    /**
     * The UUID bytes
     * @readonly
     */
    get id(): Uint8Array;
    set id(value: Uint8Array);
    /**
     * Returns the UUID id as a 32 or 36 character hex string representation, excluding/including dashes (defaults to 36 character dash separated)
     * @param includeDashes - should the string exclude dash-separators.
     */
    toHexString(includeDashes?: boolean): string;
    /**
     * Converts the id into a 36 character (dashes included) hex string, unless a encoding is specified.
     */
    toString(encoding?: 'hex' | 'base64'): string;
    /**
     * Converts the id into its JSON string representation.
     * A 36 character (dashes included) hex string in the format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
     */
    toJSON(): string;
    /**
     * Compares the equality of this UUID with `otherID`.
     *
     * @param otherId - UUID instance to compare against.
     */
    equals(otherId: string | Uint8Array | UUID): boolean;
    /**
     * Creates a Binary instance from the current UUID.
     */
    toBinary(): Binary;
    /**
     * Generates a populated buffer containing a v4 uuid
     */
    static generate(): Uint8Array;
    /**
     * Checks if a value is a valid bson UUID
     * @param input - UUID, string or Buffer to validate.
     */
    static isValid(input: string | Uint8Array | UUID | Binary): boolean;
    /**
     * Creates an UUID from a hex string representation of an UUID.
     * @param hexString - 32 or 36 character hex string (dashes excluded/included).
     */
    static createFromHexString(hexString: string): UUID;
    /** Creates an UUID from a base64 string representation of an UUID. */
    static createFromBase64(base64: string): UUID;
    /** @internal */
    static bytesFromString(representation: string): Uint8Array;
    /**
     * @internal
     *
     * Validates a string to be a hex digit sequence with or without dashes.
     * The canonical hyphenated representation of a uuid is hex in 8-4-4-4-12 groups.
     */
    static isValidUUIDString(representation: string): boolean;
    inspect(): string;
}
//# sourceMappingURL=binary.d.ts.map