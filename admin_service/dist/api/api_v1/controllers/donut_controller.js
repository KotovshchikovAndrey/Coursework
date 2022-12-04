"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../../../db/repositories");
const donut_logic_1 = __importDefault(require("../../../logic/donut_logic"));
class DonutController {
    static getFullDonutsList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const donutService = new donut_logic_1.default(repositories_1.donutSqlRepository);
            const fullDonutsList = yield donutService.getFullDonutsListFromDb();
            return res.status(200).json({
                donuts: fullDonutsList,
            });
        });
    }
    static getAllDonuts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const donutService = new donut_logic_1.default(repositories_1.donutSqlRepository);
            const donutsList = yield donutService.getAllDonuts(req.query.page);
            const pageCount = yield donutService.getPageCount();
            return res.status(200).json({
                donuts: donutsList,
                page_count: pageCount
            });
        });
    }
    static getDetailDonut(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const donutService = new donut_logic_1.default(repositories_1.donutSqlRepository);
            try {
                const donut = yield donutService.getDetailDonut(req.params.id);
                return res.status(200).json(donut);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static createDonut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const donutService = new donut_logic_1.default(repositories_1.donutSqlRepository);
            yield donutService.createDonut(req.body);
            return res.status(201).json({
                message: 'Пончик создан!'
            });
        });
    }
    static updateDonut(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const donutService = new donut_logic_1.default(repositories_1.donutSqlRepository);
            try {
                const donut = yield donutService.partialUpdateDonut(req.params.id, req.body);
                return res.status(200).json({
                    message: 'Пончик Обновлен!',
                    donut: donut
                });
            }
            catch (e) {
                return next(e);
            }
        });
    }
    static deleteDonut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const donutService = new donut_logic_1.default(repositories_1.donutSqlRepository);
            yield donutService.deleteDonut(req.params.id);
            return res.status(200).json({
                message: 'Пончик удален!'
            });
        });
    }
    static deleteIngredients(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const donutService = new donut_logic_1.default(repositories_1.donutSqlRepository);
            try {
                yield donutService.deleteIngredients(req.params.id, req.body);
                return res.status(200).json({
                    message: 'Ингредиент удален!'
                });
            }
            catch (e) {
                return next(e);
            }
        });
    }
}
exports.default = DonutController;
