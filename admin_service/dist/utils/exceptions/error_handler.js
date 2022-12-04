"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_errors_1 = __importDefault(require("./api_errors"));
function ApiErrorHandler(err, req, res, next) {
    if (err instanceof api_errors_1.default) {
        return res.status(err.status).json({
            message: err.message,
            details: err.details
        });
    }
    console.log(err);
    return res.status(500).json({
        message: 'Непредвиденная ошибка сервера!',
        details: []
    });
}
exports.default = ApiErrorHandler;
