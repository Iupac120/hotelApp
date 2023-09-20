"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.ForBiddenError = exports.UnAuthorizedError = exports.BadRequestError = exports.errorHandler = void 0;
const authentic_error_js_1 = require("./authentic.error.js");
//import { string } from "zod";
function errorHandler(err, req, res, next) {
    if (err instanceof authentic_error_js_1.CustomError) {
        return res.status(err.status).json({
            msg: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack
        });
    }
    else {
        const errorStatus = err.status || 500;
        const errorMessage = err.message || "Something went wrong";
        return res.status(errorStatus).json({
            success: false,
            status: errorStatus,
            message: errorMessage,
            stack: err.stack,
        });
    }
}
exports.errorHandler = errorHandler;
class BadRequestError extends authentic_error_js_1.CustomError {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadRequestError = BadRequestError;
class UnAuthorizedError extends authentic_error_js_1.CustomError {
    constructor(message) {
        super(message, 401);
    }
}
exports.UnAuthorizedError = UnAuthorizedError;
class ForBiddenError extends authentic_error_js_1.CustomError {
    constructor(message) {
        super(message, 403);
    }
}
exports.ForBiddenError = ForBiddenError;
class NotFoundError extends authentic_error_js_1.CustomError {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
