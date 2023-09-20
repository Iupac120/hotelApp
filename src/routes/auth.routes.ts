import {Router} from "express";
import { createPasswordHandler, createResetOtpHandler, createResetPasswordHandler, createUserHandler, getPasswordHandler, getResetPasswordHandler, loginUserHandler, logout, verifyUserOtpHandler } from "../controller/auth.controller.js";
import { trycatchHandler } from "../utils/trycatch.handler.js";
import validate from "../middleware/validateResources.js";
import { createUserSchema, otpVerifySchema, resetPasswordSchema, userEmailSchema } from "../schema/user.schema.js";
const router = Router()
    //auth routes
router.post("/register",validate(createUserSchema),trycatchHandler(createUserHandler))
router.post("/login", trycatchHandler(loginUserHandler))
router.post("/logout", logout)
router.post("/verifyOtp",validate(otpVerifySchema),trycatchHandler(verifyUserOtpHandler))
router.post("/resetOtp",validate(userEmailSchema),trycatchHandler(createResetOtpHandler))
router.get("/forgot-password",trycatchHandler(getPasswordHandler))
router.post("/forgot-password",validate(userEmailSchema),trycatchHandler(createPasswordHandler))
router.get("/reset-password/:user_id/:token", trycatchHandler(getResetPasswordHandler))
router.post("/reset-password/:user_id/:token",validate(resetPasswordSchema),trycatchHandler(createResetPasswordHandler))

export default router