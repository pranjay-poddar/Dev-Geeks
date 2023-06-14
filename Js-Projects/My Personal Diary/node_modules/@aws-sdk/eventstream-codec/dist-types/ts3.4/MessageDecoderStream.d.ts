import { Message, MessageDecoder } from "@aws-sdk/types";
export interface MessageDecoderStreamOptions {
  inputStream: AsyncIterable<Uint8Array>;
  decoder: MessageDecoder;
}
export declare class MessageDecoderStream implements AsyncIterable<Message> {
  private readonly options;
  constructor(options: MessageDecoderStreamOptions);
  [Symbol.asyncIterator](): AsyncIterator<Message>;
  private asyncIterator;
}
