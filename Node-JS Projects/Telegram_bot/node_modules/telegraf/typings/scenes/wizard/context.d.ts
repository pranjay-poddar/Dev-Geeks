import SceneContextScene, { SceneSession, SceneSessionData } from '../context';
import Context from '../../context';
import { Middleware } from '../../middleware';
import { SessionContext } from '../../session';
export interface WizardContext<D extends WizardSessionData = WizardSessionData> extends Context {
    session: WizardSession<D>;
    scene: SceneContextScene<WizardContext<D>, D>;
    wizard: WizardContextWizard<WizardContext<D>>;
}
export interface WizardSessionData extends SceneSessionData {
    cursor: number;
}
export interface WizardSession<S extends WizardSessionData = WizardSessionData> extends SceneSession<S> {
}
export default class WizardContextWizard<C extends SessionContext<WizardSession> & {
    scene: SceneContextScene<C, WizardSessionData>;
}> {
    private readonly ctx;
    private readonly steps;
    readonly state: object;
    constructor(ctx: C, steps: ReadonlyArray<Middleware<C>>);
    get step(): Middleware<C> | undefined;
    get cursor(): number;
    set cursor(cursor: number);
    selectStep(index: number): this;
    next(): this;
    back(): this;
}
//# sourceMappingURL=context.d.ts.map