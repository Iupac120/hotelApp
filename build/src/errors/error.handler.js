"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.ForBiddenError = exports.UnAuthorizedError = exports.BadRequestError = exports.errorHandler = void 0;
function errorHandler(err, req, res, next) {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
}
exports.errorHandler = errorHandler;
function BadRequestError(err, req, res, next) {
    const errorStatus = err.status || 400;
    const errorMessage = err.message || "Bad request error";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
}
exports.BadRequestError = BadRequestError;
function UnAuthorizedError(err, req, res, next) {
    const errorStatus = err.status || 401;
    const errorMessage = err.message || "Unauthorized error";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
}
exports.UnAuthorizedError = UnAuthorizedError;
function ForBiddenError(err, req, res, next) {
    const errorStatus = err.status || 403;
    const errorMessage = err.message || "Forbidden error";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
}
exports.ForBiddenError = ForBiddenError;
function NotFoundError(err, req, res, next) {
    const errorStatus = err.status || 404;
    const errorMessage = err.message || "Not found error";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
}
exports.NotFoundError = NotFoundError;
