import {
  AvailableMessage,
  AvailableMessages,
  Message,
  MessageDecoder,
  MessageEncoder,
  MessageHeaders,
} from "@aws-sdk/types";
import { Decoder, Encoder } from "@aws-sdk/types";
export declare class EventStreamCodec
  implements MessageEncoder, MessageDecoder
{
  private readonly headerMarshaller;
  private messageBuffer;
  private isEndOfStream;
  constructor(toUtf8: Encoder, fromUtf8: Decoder);
  feed(message: ArrayBufferView): void;
  endOfStream(): void;
  getMessage(): AvailableMessage;
  getAvailableMessages(): AvailableMessages;
  encode({ headers: rawHeaders, body }: Message): Uint8Array;
  decode(message: ArrayBufferView): Message;
  formatHeaders(rawHeaders: MessageHeaders): Uint8Array;
}
