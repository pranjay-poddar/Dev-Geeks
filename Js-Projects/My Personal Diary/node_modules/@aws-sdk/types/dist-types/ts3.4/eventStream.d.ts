import { HttpRequest } from "./http";
import {
  FinalizeHandler,
  FinalizeHandlerArguments,
  FinalizeHandlerOutput,
  HandlerExecutionContext,
} from "./middleware";
import { MetadataBearer } from "./response";
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
export interface Int64 {
  readonly bytes: Uint8Array;
  valueOf: () => number;
  toString: () => string;
}
export interface EventStreamSerdeContext {
  eventStreamMarshaller: EventStreamMarshaller;
}
export interface EventStreamMarshallerDeserFn<StreamType> {
  <T>(
    body: StreamType,
    deserializer: (input: Record<string, Message>) => Promise<T>
  ): AsyncIterable<T>;
}
export interface EventStreamMarshallerSerFn<StreamType> {
  <T>(input: AsyncIterable<T>, serializer: (event: T) => Message): StreamType;
}
export interface EventStreamMarshaller<StreamType = any> {
  deserialize: EventStreamMarshallerDeserFn<StreamType>;
  serialize: EventStreamMarshallerSerFn<StreamType>;
}
export interface EventStreamRequestSigner {
  sign(request: HttpRequest): Promise<HttpRequest>;
}
export interface EventStreamPayloadHandler {
  handle: <Input extends object, Output extends MetadataBearer>(
    next: FinalizeHandler<Input, Output>,
    args: FinalizeHandlerArguments<Input>,
    context?: HandlerExecutionContext
  ) => Promise<FinalizeHandlerOutput<Output>>;
}
export interface EventStreamPayloadHandlerProvider {
  (options: any): EventStreamPayloadHandler;
}
export interface EventStreamSerdeProvider {
  (options: any): EventStreamMarshaller;
}
export interface EventStreamSignerProvider {
  (options: any): EventStreamRequestSigner;
}
export {};
