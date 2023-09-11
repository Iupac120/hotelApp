"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trycatchHandler = void 0;
function trycatchHandler(controller) {
    return async function (req, res, next) {
        try {
            await controller(req, res, next);
        }
        catch (err) {
            next(err);
        }
    };
}
exports.trycatchHandler = trycatchHandler;
