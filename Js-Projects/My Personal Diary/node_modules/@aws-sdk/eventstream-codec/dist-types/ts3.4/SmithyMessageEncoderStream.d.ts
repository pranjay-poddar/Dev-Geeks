import { Message } from "@aws-sdk/types";
export interface SmithyMessageEncoderStreamOptions<T> {
  inputStream: AsyncIterable<T>;
  serializer: (event: T) => Message;
}
export declare class SmithyMessageEncoderStream<T>
  implements AsyncIterable<Message>
{
  private readonly options;
  constructor(options: SmithyMessageEncoderStreamOptions<T>);
  [Symbol.asyncIterator](): AsyncIterator<Message>;
  private asyncIterator;
}
