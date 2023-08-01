"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const trycatch_handler_1 = require("../utils/trycatch.handler");
const router = (0, express_1.Router)();
//auth routes
router.post("/register", (0, trycatch_handler_1.trycatchHandler)(auth_controller_1.createUserHandler));
router.post("/login", (0, trycatch_handler_1.trycatchHandler)(auth_controller_1.loginUserHandler));
router.post("/logout", auth_controller_1.logout);
router.get("/forgot-password", auth_controller_1.getPasswordHandler);
router.post("/forgot-password", auth_controller_1.createPasswordHandler);
router.get("/reset-password/:user_id/:token", auth_controller_1.getResetPasswordHandler);
router.post("/reset-password/:user_id/:token", auth_controller_1.createResetPasswordHandler);
exports.default = router;
