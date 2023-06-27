"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// internal type provisions
__exportStar(require("typegram/api"), exports);
__exportStar(require("typegram/markup"), exports);
__exportStar(require("typegram/menu-button"), exports);
__exportStar(require("typegram/inline"), exports);
__exportStar(require("typegram/manage"), exports);
__exportStar(require("typegram/message"), exports);
__exportStar(require("typegram/passport"), exports);
__exportStar(require("typegram/payment"), exports);
__exportStar(require("typegram/update"), exports);
