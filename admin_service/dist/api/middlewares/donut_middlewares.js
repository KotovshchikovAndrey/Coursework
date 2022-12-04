"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_middlewares_1 = require("./abstract_middlewares");
const api_errors_1 = __importDefault(require("../../utils/exceptions/api_errors"));
class DonutListValidator extends abstract_middlewares_1.ListValidator {
    validate(req, res, next) {
        this.validateQueryParams(req);
        next();
    }
}
class DonutDetailValidator extends abstract_middlewares_1.DetailValidator {
    constructor() {
        super();
    }
    validate(req, res, next) {
        this.validateId(req.params.id);
        if (this.errorsArray.length !== 0) {
            return next(api_errors_1.default.badRequest('Передан некорректный id!', this.errorsArray));
        }
        next();
    }
}
class DonutCreationValidator {
    constructor() {
        this.errorsArray = [];
    }
    validate(req, res, next) {
        this.validateName(req.body.name);
        this.validatePrice(req.body.price);
        if (this.errorsArray.length !== 0) {
            return next(api_errors_1.default.badRequest('Введены невалидные данные!', this.errorsArray));
        }
        next();
    }
    validateName(name) {
        if (typeof name === 'undefined') {
            this.errorsArray.push('Введите название пончика!');
        }
    }
    validatePrice(price) {
        if (typeof price === 'undefined') {
            this.errorsArray.push('Введите цену пончика!');
        }
        else if (typeof price !== 'number') {
            this.errorsArray.push('Цена должна быть числом!');
        }
    }
}
class DonutUpdateValidator {
    constructor() {
        this.errorsArray = [];
    }
    validate(req, res, next) {
        this.validateId(req.params.id);
        this.validatePrice(req.body.price);
        if (this.errorsArray.length !== 0) {
            return next(api_errors_1.default.badRequest('Введены невалидные данные!', this.errorsArray));
        }
        next();
    }
    validateId(id) {
        const intId = parseInt(id);
        if (intId.toString() !== id) {
            this.errorsArray.push('id должен быть целым числом!');
        }
    }
    validatePrice(price) {
        if (typeof price === 'undefined') {
            this.errorsArray.push('Введите цену пончика!');
        }
        else if (typeof price !== 'number') {
            this.errorsArray.push('Цена должна быть числом!');
        }
    }
}
function createDonutValidator(validatorName) {
    switch (validatorName) {
        case 'DetailValidator':
            return new DonutDetailValidator();
        case 'CreationValidator':
            return new DonutCreationValidator();
        case 'UpdateValidator':
            return new DonutUpdateValidator();
        case 'ListValidator':
            return new DonutListValidator();
    }
}
exports.default = createDonutValidator;
