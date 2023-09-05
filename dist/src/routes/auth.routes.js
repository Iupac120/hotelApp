"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const trycatch_handler_1 = require("../utils/trycatch.handler");
const validateResources_1 = __importDefault(require("../middleware/validateResources"));
const user_schema_1 = require("../schema/user.schema");
const router = (0, express_1.Router)();
//auth routes
router.post("/register", (0, validateResources_1.default)(user_schema_1.createUserSchema), (0, trycatch_handler_1.trycatchHandler)(auth_controller_1.createUserHandler));
router.post("/login", (0, trycatch_handler_1.trycatchHandler)(auth_controller_1.loginUserHandler));
router.post("/logout", auth_controller_1.logout);
router.post("/verifyOtp", (0, validateResources_1.default)(user_schema_1.otpVerifySchema), (0, trycatch_handler_1.trycatchHandler)(auth_controller_1.verifyUserOtpHandler));
router.post("/resetOtp", (0, validateResources_1.default)(user_schema_1.userEmailSchema), (0, trycatch_handler_1.trycatchHandler)(auth_controller_1.createResetOtpHandler));
router.get("/forgot-password", (0, trycatch_handler_1.trycatchHandler)(auth_controller_1.getPasswordHandler));
router.post("/forgot-password", (0, validateResources_1.default)(user_schema_1.userEmailSchema), (0, trycatch_handler_1.trycatchHandler)(auth_controller_1.createPasswordHandler));
router.get("/reset-password/:user_id/:token", (0, trycatch_handler_1.trycatchHandler)(auth_controller_1.getResetPasswordHandler));
router.post("/reset-password/:user_id/:token", (0, validateResources_1.default)(user_schema_1.resetPasswordSchema), (0, trycatch_handler_1.trycatchHandler)(auth_controller_1.createResetPasswordHandler));
exports.default = router;
