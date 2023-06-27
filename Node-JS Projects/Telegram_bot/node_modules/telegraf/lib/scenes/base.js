"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseScene = void 0;
const composer_1 = __importDefault(require("../composer"));
const { compose } = composer_1.default;
class BaseScene extends composer_1.default {
    constructor(id, options) {
        const opts = {
            handlers: [],
            enterHandlers: [],
            leaveHandlers: [],
            ...options,
        };
        super(...opts.handlers);
        this.id = id;
        this.ttl = opts.ttl;
        this.enterHandler = compose(opts.enterHandlers);
        this.leaveHandler = compose(opts.leaveHandlers);
    }
    enter(...fns) {
        this.enterHandler = compose([this.enterHandler, ...fns]);
        return this;
    }
    leave(...fns) {
        this.leaveHandler = compose([this.leaveHandler, ...fns]);
        return this;
    }
    enterMiddleware() {
        return this.enterHandler;
    }
    leaveMiddleware() {
        return this.leaveHandler;
    }
}
exports.BaseScene = BaseScene;
exports.default = BaseScene;
