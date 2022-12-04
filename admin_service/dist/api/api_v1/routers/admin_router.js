"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const donut_routers_1 = __importDefault(require("./donut_routers"));
const ingredient_router_1 = __importDefault(require("./ingredient_router"));
const adminRouter = express_1.default.Router();
adminRouter.use('/donut', donut_routers_1.default);
adminRouter.use('/ingredient', ingredient_router_1.default);
exports.default = adminRouter;
