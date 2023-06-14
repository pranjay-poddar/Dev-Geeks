import { Int64 as IInt64 } from "@aws-sdk/types";
export interface Int64 extends IInt64 {}
export declare class Int64 {
  readonly bytes: Uint8Array;
  constructor(bytes: Uint8Array);
  static fromNumber(number: number): Int64;
  valueOf(): number;
  toString(): string;
}
