"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedin = void 0;
async function isLoggedin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect("/");
    }
}
exports.isLoggedin = isLoggedin;
