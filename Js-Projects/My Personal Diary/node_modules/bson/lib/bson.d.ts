import { Binary, UUID } from './binary';
import { Code } from './code';
import { DBRef } from './db_ref';
import { Decimal128 } from './decimal128';
import { Double } from './double';
import { Int32 } from './int_32';
import { Long } from './long';
import { MaxKey } from './max_key';
import { MinKey } from './min_key';
import { ObjectId } from './objectid';
import { DeserializeOptions } from './parser/deserializer';
import { SerializeOptions } from './parser/serializer';
import { BSONRegExp } from './regexp';
import { BSONSymbol } from './symbol';
import { Timestamp } from './timestamp';
export type { UUIDExtended, BinaryExtended, BinaryExtendedLegacy, BinarySequence } from './binary';
export type { CodeExtended } from './code';
export type { DBRefLike } from './db_ref';
export type { Decimal128Extended } from './decimal128';
export type { DoubleExtended } from './double';
export type { EJSONOptions } from './extended_json';
export type { Int32Extended } from './int_32';
export type { LongExtended } from './long';
export type { MaxKeyExtended } from './max_key';
export type { MinKeyExtended } from './min_key';
export type { ObjectIdExtended, ObjectIdLike } from './objectid';
export type { BSONRegExpExtended, BSONRegExpExtendedLegacy } from './regexp';
export type { BSONSymbolExtended } from './symbol';
export type { LongWithoutOverrides, TimestampExtended, TimestampOverrides } from './timestamp';
export type { LongWithoutOverridesClass } from './timestamp';
export type { SerializeOptions, DeserializeOptions };
export { Code, BSONSymbol, DBRef, Binary, ObjectId, UUID, Long, Timestamp, Double, Int32, MinKey, MaxKey, BSONRegExp, Decimal128 };
export { BSONValue } from './bson_value';
export { BSONError, BSONVersionError, BSONRuntimeError } from './error';
export { BSONType } from './constants';
export { EJSON } from './extended_json';
/** @public */
export interface Document {
    [key: string]: any;
}
/**
 * Sets the size of the internal serialization buffer.
 *
 * @param size - The desired size for the internal serialization buffer in bytes
 * @public
 */
export declare function setInternalBufferSize(size: number): void;
/**
 * Serialize a Javascript object.
 *
 * @param object - the Javascript object to serialize.
 * @returns Buffer object containing the serialized object.
 * @public
 */
export declare function serialize(object: Document, options?: SerializeOptions): Uint8Array;
/**
 * Serialize a Javascript object using a predefined Buffer and index into the buffer,
 * useful when pre-allocating the space for serialization.
 *
 * @param object - the Javascript object to serialize.
 * @param finalBuffer - the Buffer you pre-allocated to store the serialized BSON object.
 * @returns the index pointing to the last written byte in the buffer.
 * @public
 */
export declare function serializeWithBufferAndIndex(object: Document, finalBuffer: Uint8Array, options?: SerializeOptions): number;
/**
 * Deserialize data as BSON.
 *
 * @param buffer - the buffer containing the serialized set of BSON documents.
 * @returns returns the deserialized Javascript Object.
 * @public
 */
export declare function deserialize(buffer: Uint8Array, options?: DeserializeOptions): Document;
/** @public */
export type CalculateObjectSizeOptions = Pick<SerializeOptions, 'serializeFunctions' | 'ignoreUndefined'>;
/**
 * Calculate the bson size for a passed in Javascript object.
 *
 * @param object - the Javascript object to calculate the BSON byte size for
 * @returns size of BSON object in bytes
 * @public
 */
export declare function calculateObjectSize(object: Document, options?: CalculateObjectSizeOptions): number;
/**
 * Deserialize stream data as BSON documents.
 *
 * @param data - the buffer containing the serialized set of BSON documents.
 * @param startIndex - the start index in the data Buffer where the deserialization is to start.
 * @param numberOfDocuments - number of documents to deserialize.
 * @param documents - an array where to store the deserialized documents.
 * @param docStartIndex - the index in the documents array from where to start inserting documents.
 * @param options - additional options used for the deserialization.
 * @returns next index in the buffer after deserialization **x** numbers of documents.
 * @public
 */
export declare function deserializeStream(data: Uint8Array | ArrayBuffer, startIndex: number, numberOfDocuments: number, documents: Document[], docStartIndex: number, options: DeserializeOptions): number;
//# sourceMappingURL=bson.d.ts.map