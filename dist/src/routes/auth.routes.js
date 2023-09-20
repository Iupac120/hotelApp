"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_js_1 = require("../controller/auth.controller.js");
const trycatch_handler_js_1 = require("../utils/trycatch.handler.js");
const validateResources_js_1 = __importDefault(require("../middleware/validateResources.js"));
const user_schema_js_1 = require("../schema/user.schema.js");
const router = (0, express_1.Router)();
//auth routes
router.post("/register", (0, validateResources_js_1.default)(user_schema_js_1.createUserSchema), (0, trycatch_handler_js_1.trycatchHandler)(auth_controller_js_1.createUserHandler));
router.post("/login", (0, trycatch_handler_js_1.trycatchHandler)(auth_controller_js_1.loginUserHandler));
router.post("/logout", auth_controller_js_1.logout);
router.post("/verifyOtp", (0, validateResources_js_1.default)(user_schema_js_1.otpVerifySchema), (0, trycatch_handler_js_1.trycatchHandler)(auth_controller_js_1.verifyUserOtpHandler));
router.post("/resetOtp", (0, validateResources_js_1.default)(user_schema_js_1.userEmailSchema), (0, trycatch_handler_js_1.trycatchHandler)(auth_controller_js_1.createResetOtpHandler));
router.get("/forgot-password", (0, trycatch_handler_js_1.trycatchHandler)(auth_controller_js_1.getPasswordHandler));
router.post("/forgot-password", (0, validateResources_js_1.default)(user_schema_js_1.userEmailSchema), (0, trycatch_handler_js_1.trycatchHandler)(auth_controller_js_1.createPasswordHandler));
router.get("/reset-password/:user_id/:token", (0, trycatch_handler_js_1.trycatchHandler)(auth_controller_js_1.getResetPasswordHandler));
router.post("/reset-password/:user_id/:token", (0, validateResources_js_1.default)(user_schema_js_1.resetPasswordSchema), (0, trycatch_handler_js_1.trycatchHandler)(auth_controller_js_1.createResetPasswordHandler));
exports.default = router;
