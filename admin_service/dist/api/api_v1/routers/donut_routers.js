"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const donut_controller_1 = __importDefault(require("../controllers/donut_controller"));
const donut_middlewares_1 = __importDefault(require("../../middlewares/donut_middlewares"));
const donutRouter = express_1.default.Router();
donutRouter
    .all('/full', donut_controller_1.default.getFullDonutsList)
    .all('/all', (req, res, next) => {
    (0, donut_middlewares_1.default)('ListValidator').validate(req, res, next);
}, donut_controller_1.default.getAllDonuts)
    .get('/:id', (req, res, next) => {
    (0, donut_middlewares_1.default)('DetailValidator').validate(req, res, next);
}, donut_controller_1.default.getDetailDonut)
    .post('/', (req, res, next) => {
    (0, donut_middlewares_1.default)('CreationValidator').validate(req, res, next);
}, donut_controller_1.default.createDonut)
    .patch('/:id', (req, res, next) => {
    (0, donut_middlewares_1.default)('UpdateValidator').validate(req, res, next);
}, donut_controller_1.default.updateDonut)
    .delete('/:id', (req, res, next) => {
    (0, donut_middlewares_1.default)('DetailValidator').validate(req, res, next);
}, donut_controller_1.default.deleteDonut)
    .delete('/ingredients.remove/:id', (req, res, next) => {
    (0, donut_middlewares_1.default)('DetailValidator').validate(req, res, next);
}, donut_controller_1.default.deleteIngredients);
exports.default = donutRouter;
