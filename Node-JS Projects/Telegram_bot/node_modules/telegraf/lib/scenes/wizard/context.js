"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WizardContextWizard {
    constructor(ctx, steps) {
        var _a;
        this.ctx = ctx;
        this.steps = steps;
        this.state = ctx.scene.state;
        this.cursor = (_a = ctx.scene.session.cursor) !== null && _a !== void 0 ? _a : 0;
    }
    get step() {
        return this.steps[this.cursor];
    }
    get cursor() {
        return this.ctx.scene.session.cursor;
    }
    set cursor(cursor) {
        this.ctx.scene.session.cursor = cursor;
    }
    selectStep(index) {
        this.cursor = index;
        return this;
    }
    next() {
        return this.selectStep(this.cursor + 1);
    }
    back() {
        return this.selectStep(this.cursor - 1);
    }
}
exports.default = WizardContextWizard;
