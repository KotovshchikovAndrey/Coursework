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
const api_errors_1 = __importDefault(require("../utils/exceptions/api_errors"));
const repositories_1 = require("../db/repositories");
const ingredient_logic_1 = __importDefault(require("./ingredient_logic"));
const pageLimit = 2;
class DonutService {
    constructor(donutRepository) {
        this.donutRepository = donutRepository;
    }
    getFullDonutsListFromDb() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.donutRepository.find({
                relations: {
                    ingredients: true
                }
            });
        });
    }
    getAllDonuts(pageNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = parseInt(pageNumber) * pageLimit - pageLimit;
            const donutsList = yield this.donutRepository.find({
                take: pageLimit,
                skip: offset,
                select: { id: true, name: true, }
            });
            return donutsList;
        });
    }
    getPageCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const donutCounts = yield this.donutRepository.count();
            const pageCounts = Math.ceil(donutCounts / pageLimit);
            return pageCounts;
        });
    }
    getDetailDonut(donutId) {
        return __awaiter(this, void 0, void 0, function* () {
            const donut = yield this.donutRepository.findOne({
                where: {
                    id: parseInt(donutId)
                },
                relations: {
                    ingredients: true
                }
            });
            if (donut === null) {
                throw api_errors_1.default.notFound('Запись не найдена!');
            }
            return donut;
        });
    }
    createDonut(newDonutData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, price, ingredientsNames } = newDonutData;
            const newDonut = this.donutRepository.create({
                name: name,
                description: description,
                price: price
            });
            if (typeof ingredientsNames !== 'undefined') {
                yield this.setIngregientsForDonut(newDonut, ingredientsNames);
            }
            yield this.donutRepository.save(newDonut);
        });
    }
    partialUpdateDonut(donutId, updateDonutData) {
        return __awaiter(this, void 0, void 0, function* () {
            const donutInstanceForUpdate = yield this.donutRepository.findOne({ where: { id: parseInt(donutId) } });
            if (donutInstanceForUpdate === null) {
                throw api_errors_1.default.notFound('Запись не найдена!');
            }
            if (typeof updateDonutData.ingredientsNames !== 'undefined') {
                yield this.setIngregientsForDonut(donutInstanceForUpdate, updateDonutData.ingredientsNames);
            }
            const allowedUpdateFields = ['name', 'description', 'price'];
            for (const field in updateDonutData) {
                if (!allowedUpdateFields.includes(field)) {
                    delete updateDonutData[field];
                }
            }
            this.donutRepository.merge(donutInstanceForUpdate, updateDonutData);
            const updatedDonut = yield this.donutRepository.save(donutInstanceForUpdate);
            return updatedDonut;
        });
    }
    deleteDonut(donutId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.donutRepository.delete({
                id: parseInt(donutId)
            });
        });
    }
    deleteIngredients(donutId, removeDonutIngredientData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ingredientsNames } = removeDonutIngredientData;
            if (!ingredientsNames) {
                return;
            }
            const donutInstance = yield this.donutRepository.findOne({
                where: { id: parseInt(donutId) },
                relations: { ingredients: true }
            });
            if (donutInstance === null) {
                throw api_errors_1.default.notFound('Запись не найдена!');
            }
            donutInstance.ingredients = donutInstance.ingredients.filter((ingredient) => {
                return !ingredientsNames.includes(ingredient.name);
            });
            yield this.donutRepository.save(donutInstance);
        });
    }
    setIngregientsForDonut(donutInstance, ingredientsNames) {
        return __awaiter(this, void 0, void 0, function* () {
            const ingredientService = new ingredient_logic_1.default(repositories_1.ingredientSqlRepository);
            const ingredients = yield ingredientService.findIngredientsByName(ingredientsNames);
            donutInstance.ingredients = ingredients;
        });
    }
}
exports.default = DonutService;
