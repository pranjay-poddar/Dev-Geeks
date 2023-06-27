import { Context } from './context';
export type MiddlewareFn<C extends Context> = (ctx: C, next: () => Promise<void>) => Promise<unknown> | void;
export interface MiddlewareObj<C extends Context> {
    middleware: () => MiddlewareFn<C>;
}
export type Middleware<C extends Context> = MiddlewareFn<C> | MiddlewareObj<C>;
//# sourceMappingURL=middleware.d.ts.map