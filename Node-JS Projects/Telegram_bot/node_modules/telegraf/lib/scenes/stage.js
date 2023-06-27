"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stage = void 0;
const session_1 = require("../session");
const context_1 = __importDefault(require("./context"));
const composer_1 = require("../composer");
class Stage extends composer_1.Composer {
    constructor(scenes = [], options) {
        super();
        this.options = { ...options };
        this.scenes = new Map();
        scenes.forEach((scene) => this.register(scene));
    }
    register(...scenes) {
        scenes.forEach((scene) => {
            if ((scene === null || scene === void 0 ? void 0 : scene.id) == null || typeof scene.middleware !== 'function') {
                throw new Error('telegraf: Unsupported scene');
            }
            this.scenes.set(scene.id, scene);
        });
        return this;
    }
    middleware() {
        const handler = composer_1.Composer.compose([
            (ctx, next) => {
                const scenes = this.scenes;
                const scene = new context_1.default(ctx, scenes, this.options);
                ctx.scene = scene;
                return next();
            },
            super.middleware(),
            composer_1.Composer.lazy((ctx) => { var _a; return (_a = ctx.scene.current) !== null && _a !== void 0 ? _a : composer_1.Composer.passThru(); }),
        ]);
        return composer_1.Composer.optional(session_1.isSessionContext, handler);
    }
    static enter(...args) {
        return (ctx) => ctx.scene.enter(...args);
    }
    static reenter(...args) {
        return (ctx) => ctx.scene.reenter(...args);
    }
    static leave(...args) {
        return (ctx) => ctx.scene.leave(...args);
    }
}
exports.Stage = Stage;
