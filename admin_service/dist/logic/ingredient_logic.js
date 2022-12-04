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
const typeorm_1 = require("typeorm");
const api_errors_1 = __importDefault(require("../utils/exceptions/api_errors"));
const file_uploader_1 = __importDefault(require("../utils/files/file_uploader"));
const pageLimit = 2;
class IngredientService {
    constructor(ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }
    getIngredientsList(pageNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = parseInt(pageNumber) * pageLimit - pageLimit;
            const donutsList = yield this.ingredientRepository.find({ take: pageLimit, skip: offset });
            return donutsList;
        });
    }
    getPageCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const ingredientsCount = yield this.ingredientRepository.count();
            const pageCount = Math.ceil(ingredientsCount / pageLimit);
            return pageCount;
        });
    }
    createIngredient(files, newIngredientData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = newIngredientData;
            const isIngredientExists = (yield this.ingredientRepository.count({
                where: {
                    name: name
                }
            })) != 0;
            if (isIngredientExists) {
                throw api_errors_1.default.badRequest('Ошибка создания записи!', ['Ингедиент с таким названием уже существует!']);
            }
            const newIngredient = this.ingredientRepository.create(newIngredientData);
            const imageFile = files === null || files === void 0 ? void 0 : files.image;
            if (imageFile) {
                const fileUploader = new file_uploader_1.default();
                const imageName = yield fileUploader.upload(imageFile);
                newIngredient.image = imageName;
            }
            yield this.ingredientRepository.save(newIngredient);
        });
    }
    deleteIngredient(ingredientId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ingredientRepository.delete({
                id: parseInt(ingredientId)
            });
        });
    }
    findIngredientsByName(names) {
        return __awaiter(this, void 0, void 0, function* () {
            const ingredients = yield this.ingredientRepository.find({
                where: {
                    name: (0, typeorm_1.In)(names),
                }
            });
            return ingredients;
        });
    }
}
exports.default = IngredientService;
