import { Middleware, MiddlewareFn } from '../middleware';
import Composer from '../composer';
import Context from '../context';
export interface SceneOptions<C extends Context> {
    ttl?: number;
    handlers: ReadonlyArray<MiddlewareFn<C>>;
    enterHandlers: ReadonlyArray<MiddlewareFn<C>>;
    leaveHandlers: ReadonlyArray<MiddlewareFn<C>>;
}
export declare class BaseScene<C extends Context = Context> extends Composer<C> {
    id: string;
    ttl?: number;
    enterHandler: MiddlewareFn<C>;
    leaveHandler: MiddlewareFn<C>;
    constructor(id: string, options?: SceneOptions<C>);
    enter(...fns: Array<Middleware<C>>): this;
    leave(...fns: Array<Middleware<C>>): this;
    enterMiddleware(): MiddlewareFn<C>;
    leaveMiddleware(): MiddlewareFn<C>;
}
export default BaseScene;
//# sourceMappingURL=base.d.ts.map