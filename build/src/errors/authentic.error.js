"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomError = void 0;
class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
function createCustomError(msg, status) {
    return new CustomError(msg, status);
}
exports.createCustomError = createCustomError;
