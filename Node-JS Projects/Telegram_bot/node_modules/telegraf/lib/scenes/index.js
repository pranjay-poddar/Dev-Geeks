"use strict";
/**
 * @see https://github.com/telegraf/telegraf/issues/705#issuecomment-549056045
 * @see https://www.npmjs.com/package/telegraf-stateless-question
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WizardContextWizard = exports.WizardScene = exports.BaseScene = exports.SceneContextScene = exports.Stage = void 0;
var stage_1 = require("./stage");
Object.defineProperty(exports, "Stage", { enumerable: true, get: function () { return stage_1.Stage; } });
var context_1 = require("./context");
Object.defineProperty(exports, "SceneContextScene", { enumerable: true, get: function () { return __importDefault(context_1).default; } });
var base_1 = require("./base");
Object.defineProperty(exports, "BaseScene", { enumerable: true, get: function () { return base_1.BaseScene; } });
var wizard_1 = require("./wizard");
Object.defineProperty(exports, "WizardScene", { enumerable: true, get: function () { return wizard_1.WizardScene; } });
var context_2 = require("./wizard/context");
Object.defineProperty(exports, "WizardContextWizard", { enumerable: true, get: function () { return __importDefault(context_2).default; } });
