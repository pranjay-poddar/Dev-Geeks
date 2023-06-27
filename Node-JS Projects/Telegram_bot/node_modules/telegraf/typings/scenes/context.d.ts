import BaseScene from './base';
import Context from '../context';
import { SessionContext } from '../session';
export interface SceneContext<D extends SceneSessionData = SceneSessionData> extends Context {
    session: SceneSession<D>;
    scene: SceneContextScene<SceneContext<D>, D>;
}
export interface SceneSessionData {
    current?: string;
    expires?: number;
    state?: object;
}
export interface SceneSession<S extends SceneSessionData = SceneSessionData> {
    __scenes: S;
}
export interface SceneContextSceneOptions<D extends SceneSessionData> {
    ttl?: number;
    default?: string;
    defaultSession: D;
}
export default class SceneContextScene<C extends SessionContext<SceneSession<D>>, D extends SceneSessionData = SceneSessionData> {
    private readonly ctx;
    private readonly scenes;
    private readonly options;
    constructor(ctx: C, scenes: Map<string, BaseScene<C>>, options: Partial<SceneContextSceneOptions<D>>);
    get session(): D;
    get state(): object;
    set state(value: object);
    get current(): BaseScene<C> | undefined;
    reset(): void;
    enter(sceneId: string, initialState?: object, silent?: boolean): Promise<unknown>;
    reenter(): Promise<unknown> | undefined;
    private leaving;
    leave(): Promise<void>;
}
//# sourceMappingURL=context.d.ts.map