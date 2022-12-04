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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_middlewares_1 = require("./abstract_middlewares");
const api_errors_1 = __importDefault(require("../../utils/exceptions/api_errors"));
const path = __importStar(require("path"));
class IngredientListValidator extends abstract_middlewares_1.ListValidator {
    validate(req, res, next) {
        this.validateQueryParams(req);
        next();
    }
}
class IngredientDetailValidator extends abstract_middlewares_1.DetailValidator {
    constructor() {
        super();
    }
    validate(req, res, next) {
        this.validateId(req.params.id);
        if (this.errorsArray.length !== 0) {
            return next(api_errors_1.default.badRequest("Передан некорректный id!", this.errorsArray));
        }
        next();
    }
}
class IngredientCreationValidator {
    constructor() {
        this.errorsArray = [];
    }
    validate(req, res, next) {
        this.validateName(req.body.name);
        this.validateImage(req.files);
        if (this.errorsArray.length !== 0) {
            return next(api_errors_1.default.badRequest('Введены невалидные данные!', this.errorsArray));
        }
        next();
    }
    validateName(name) {
        if (typeof name === 'undefined') {
            this.errorsArray.push('Заполните название инградиента!');
        }
    }
    validateImage(files) {
        const image = files === null || files === void 0 ? void 0 : files.image;
        if (typeof image !== 'undefined') {
            const allowedExtension = ['.png', '.jpg', '.jpeg'];
            const extensionName = path.extname(image.name);
            if (!allowedExtension.includes(extensionName)) {
                this.errorsArray.push('Недопустимый формат изображения! Изображение должно быть формата ' +
                    allowedExtension.join(' или'));
            }
        }
    }
}
function createIngredientValidator(validatorName) {
    switch (validatorName) {
        case 'ListValidator':
            return new IngredientListValidator();
        case 'DetailValidator':
            return new IngredientDetailValidator();
        case 'CreationValidator':
            return new IngredientCreationValidator();
    }
}
exports.default = createIngredientValidator;
