import {Router} from "express";
import { createPasswordHandler, createResetOtpHandler, createResetPasswordHandler, createUserHandler, getPasswordHandler, getResetPasswordHandler, loginUserHandler, logout, verifyUserOtpHandler } from "../controller/auth.controller";
import { trycatchHandler } from "../utils/trycatch.handler";
import validate from "../middleware/validateResources";
import { createUserSchema } from "../schema/user.schema";
const router = Router()
    //auth routes
router.post("/register",validate(createUserSchema),trycatchHandler(createUserHandler))
router.post("/login", trycatchHandler(loginUserHandler))
router.post("/logout", logout)
router.post("/verifyOtp", trycatchHandler(verifyUserOtpHandler))
router.post("/resetOtp",trycatchHandler(createResetOtpHandler))
router.get("/forgot-password",getPasswordHandler)
router.post("/forgot-password",createPasswordHandler)
router.get("/reset-password/:user_id/:token", getResetPasswordHandler)
router.post("/reset-password/:user_id/:token",createResetPasswordHandler)

export default router