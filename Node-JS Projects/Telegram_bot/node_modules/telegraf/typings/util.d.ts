/// <reference types="node" />
import { FmtString } from './format';
export declare const env: NodeJS.ProcessEnv;
export type Any = {} | undefined | null;
export type Expand<T> = T extends object ? T extends infer O ? {
    [K in keyof O]: O[K];
} : never : T;
export type MaybeArray<T> = T | T[];
export type MaybePromise<T> = T | Promise<T>;
export type NonemptyReadonlyArray<T> = readonly [T, ...T[]];
export declare function fmtCaption<Extra extends {
    caption?: string | FmtString;
} | undefined>(extra?: Extra): Extra extends undefined ? undefined : Omit<Extra, 'caption'> & {
    caption?: string;
};
/** Construct a generic type guard */
export type Guard<X = unknown, Y extends X = X> = (x: X) => x is Y;
/** Extract the guarded type from a type guard, defaults to never. */
export type Guarded<F> = F extends (x: any) => x is infer T ? T : never;
export declare function zip<X, Y>(xs: Iterable<X>, ys: Iterable<Y>): Iterable<X | Y>;
//# sourceMappingURL=util.d.ts.map