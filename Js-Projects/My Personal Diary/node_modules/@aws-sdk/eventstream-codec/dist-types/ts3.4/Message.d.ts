import { Int64 } from "./Int64";
export interface Message {
  headers: MessageHeaders;
  body: Uint8Array;
}
export type MessageHeaders = Record<string, MessageHeaderValue>;
type HeaderValue<K extends string, V> = {
  type: K;
  value: V;
};
export type BooleanHeaderValue = HeaderValue<"boolean", boolean>;
export type ByteHeaderValue = HeaderValue<"byte", number>;
export type ShortHeaderValue = HeaderValue<"short", number>;
export type IntegerHeaderValue = HeaderValue<"integer", number>;
export type LongHeaderValue = HeaderValue<"long", Int64>;
export type BinaryHeaderValue = HeaderValue<"binary", Uint8Array>;
export type StringHeaderValue = HeaderValue<"string", string>;
export type TimestampHeaderValue = HeaderValue<"timestamp", Date>;
export type UuidHeaderValue = HeaderValue<"uuid", string>;
export type MessageHeaderValue =
  | BooleanHeaderValue
  | ByteHeaderValue
  | ShortHeaderValue
  | IntegerHeaderValue
  | LongHeaderValue
  | BinaryHeaderValue
  | StringHeaderValue
  | TimestampHeaderValue
  | UuidHeaderValue;
export {};
