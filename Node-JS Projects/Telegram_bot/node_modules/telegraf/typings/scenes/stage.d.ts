import { SessionContext } from '../session';
import SceneContextScene, { SceneContextSceneOptions, SceneSession, SceneSessionData } from './context';
import { BaseScene } from './base';
import { Composer } from '../composer';
import { Context } from '../context';
export declare class Stage<C extends SessionContext<SceneSession<D>> & {
    scene: SceneContextScene<C, D>;
}, D extends SceneSessionData = SceneSessionData> extends Composer<C> {
    options: Partial<SceneContextSceneOptions<D>>;
    scenes: Map<string, BaseScene<C>>;
    constructor(scenes?: ReadonlyArray<BaseScene<C>>, options?: Partial<SceneContextSceneOptions<D>>);
    register(...scenes: ReadonlyArray<BaseScene<C>>): this;
    middleware(): import("../middleware").MiddlewareFn<C>;
    static enter<C extends Context & {
        scene: SceneContextScene<C>;
    }>(...args: Parameters<SceneContextScene<C>['enter']>): (ctx: C) => Promise<unknown>;
    static reenter<C extends Context & {
        scene: SceneContextScene<C>;
    }>(...args: Parameters<SceneContextScene<C>['reenter']>): (ctx: C) => Promise<unknown> | undefined;
    static leave<C extends Context & {
        scene: SceneContextScene<C>;
    }>(...args: Parameters<SceneContextScene<C>['leave']>): (ctx: C) => Promise<void>;
}
//# sourceMappingURL=stage.d.ts.map