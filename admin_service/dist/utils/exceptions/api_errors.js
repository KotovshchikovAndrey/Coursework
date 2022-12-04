"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(status, message, details) {
        super();
        this.status = status;
        this.message = message;
        this.details = details;
    }
    static badRequest(message, details = []) {
        return new ApiError(400, message, details);
    }
    static forbidden(message, details = []) {
        return new ApiError(403, message, details);
    }
    static notFound(message, details = []) {
        return new ApiError(404, message, details);
    }
    static internal(message, details = []) {
        return new ApiError(500, message, details);
    }
}
exports.default = ApiError;
