/** @format */
import { Middleware, MiddlewareObj } from './middleware';
import Context from './context';
type NonemptyReadonlyArray<T> = readonly [T, ...T[]];
type RouteFn<TContext extends Context> = (ctx: TContext) => {
    route: string;
    context?: Partial<TContext>;
    state?: Partial<TContext['state']>;
} | null;
/** @deprecated in favor of {@link Composer.dispatch} */
export declare class Router<C extends Context> implements MiddlewareObj<C> {
    private readonly routeFn;
    handlers: Map<string, Middleware<C>>;
    private otherwiseHandler;
    constructor(routeFn: RouteFn<C>, handlers?: Map<string, Middleware<C>>);
    on(route: string, ...fns: NonemptyReadonlyArray<Middleware<C>>): this;
    otherwise(...fns: NonemptyReadonlyArray<Middleware<C>>): this;
    middleware(): import("./middleware").MiddlewareFn<C>;
}
export {};
//# sourceMappingURL=router.d.ts.map