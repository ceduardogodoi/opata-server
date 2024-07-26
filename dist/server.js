"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const animals_1 = require("./routes/animals");
const app = new koa_1.default();
// middlewares
// add routes
app
    .use(animals_1.animalsRouter.routes());
// running
app.listen(3000, () => {
    console.info(`
    - Server running on port 3000.
    - CTRL + C to stop it.
  `);
});
