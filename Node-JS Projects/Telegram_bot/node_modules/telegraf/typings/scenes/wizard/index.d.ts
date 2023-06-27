import BaseScene, { SceneOptions } from '../base';
import { Middleware, MiddlewareObj } from '../../middleware';
import WizardContextWizard, { WizardSessionData } from './context';
import Context from '../../context';
import SceneContextScene from '../context';
export declare class WizardScene<C extends Context & {
    scene: SceneContextScene<C, WizardSessionData>;
    wizard: WizardContextWizard<C>;
}> extends BaseScene<C> implements MiddlewareObj<C> {
    steps: Array<Middleware<C>>;
    constructor(id: string, ...steps: Array<Middleware<C>>);
    constructor(id: string, options: SceneOptions<C>, ...steps: Array<Middleware<C>>);
    middleware(): import("../../middleware").MiddlewareFn<C>;
    enterMiddleware(): import("../../middleware").MiddlewareFn<C>;
}
//# sourceMappingURL=index.d.ts.map