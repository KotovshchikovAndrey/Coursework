"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ingredient_controller_1 = __importDefault(require("../controllers/ingredient_controller"));
const ingredient_middlewares_1 = __importDefault(require("../../middlewares/ingredient_middlewares"));
const ingredientRouter = express_1.default.Router();
ingredientRouter
    .all('/all', (req, res, next) => {
    (0, ingredient_middlewares_1.default)('ListValidator').validate(req, res, next);
}, ingredient_controller_1.default.getIngredientsList)
    .post('/', (req, res, next) => {
    (0, ingredient_middlewares_1.default)('CreationValidator').validate(req, res, next);
}, ingredient_controller_1.default.createIngredient)
    .delete('/:id', (req, res, next) => {
    (0, ingredient_middlewares_1.default)('DetailValidator').validate(req, res, next);
}, ingredient_controller_1.default.deleteIngredient);
exports.default = ingredientRouter;
