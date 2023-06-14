export interface MessageParts {
  headers: DataView;
  body: Uint8Array;
}
export declare function splitMessage({
  byteLength,
  byteOffset,
  buffer,
}: ArrayBufferView): MessageParts;
