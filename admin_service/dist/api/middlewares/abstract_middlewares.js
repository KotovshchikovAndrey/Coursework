"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailValidator = exports.ListValidator = void 0;
class ListValidator {
    constructor() {
        this.errorsArray = [];
    }
    validateQueryParams(req) {
        const page = req.query.page;
        const pageNumber = Number(page);
        if (pageNumber.toString() !== page) {
            req.query.page = '1';
        }
        else if (pageNumber < 1) {
            req.query.page = '1';
        }
        else {
            req.query.page = pageNumber.toString();
        }
    }
}
exports.ListValidator = ListValidator;
class DetailValidator {
    constructor() {
        this.errorsArray = [];
    }
    validateId(id) {
        const intId = parseInt(id);
        if (intId.toString() !== id) {
            this.errorsArray.push('id должен быть целым числом!');
        }
    }
}
exports.DetailValidator = DetailValidator;
