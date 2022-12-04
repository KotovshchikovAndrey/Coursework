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
const ingredient_logic_1 = __importDefault(require("../../../logic/ingredient_logic"));
class IngredientController {
    static getIngredientsList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const ingredientService = new ingredient_logic_1.default(repositories_1.ingredientSqlRepository);
            const ingredientsList = yield ingredientService.getIngredientsList(req.query.page);
            const pageCount = yield ingredientService.getPageCount();
            return res.status(200).json({
                ingredients: ingredientsList,
                pageCount: pageCount
            });
        });
    }
    static createIngredient(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const ingredientService = new ingredient_logic_1.default(repositories_1.ingredientSqlRepository);
            try {
                yield ingredientService.createIngredient(req.files, req.body);
                return res.status(201).json({
                    message: 'Ингредиент создан!'
                });
            }
            catch (e) {
                return next(e);
            }
        });
    }
    static deleteIngredient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ingredientService = new ingredient_logic_1.default(repositories_1.ingredientSqlRepository);
            yield ingredientService.deleteIngredient(req.params.id);
            return res.status(200).json({
                message: 'Ингредиент удален!'
            });
        });
    }
}
exports.default = IngredientController;
