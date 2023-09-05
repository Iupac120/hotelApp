"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const passport_controller_1 = require("../controller/passport.controller");
const router = (0, express_1.Router)();
router.get("/login/google", passport_1.default.authenticate('google', { scope: ['profile email'] }));
router.get("/login/facebook", passport_1.default.authenticate('facebook'));
router.get("/google", passport_1.default.authenticate('google'), (req, res) => {
    res.redirect("/profile");
});
router.get("/facebook", passport_1.default.authenticate('facebook'), (req, res) => {
    res.redirect("/profile");
});
router.get("/profile", passport_controller_1.isLoggedin, (req, res) => {
    res.send(req.user ? req.user : `Not logged in, login with facebook or google`);
});
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Succesfully logged out");
        }
    });
    res.redirect("/");
});
exports.default = router;
