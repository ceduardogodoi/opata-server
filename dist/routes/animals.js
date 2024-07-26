"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.animalsRouter = void 0;
const router_1 = __importDefault(require("@koa/router"));
exports.animalsRouter = new router_1.default({
    prefix: '/animals',
});
exports.animalsRouter.get('/', (ctx) => {
    ctx.body = 'Animals route';
});
exports.animalsRouter.post('/', (ctx) => {
    ctx.body = 'Animals post route';
});
