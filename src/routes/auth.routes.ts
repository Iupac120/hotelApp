import {Router} from "express";
import { createPasswordHandler, createResetPasswordHandler, createUserHandler, getPasswordHandler, getResetPasswordHandler, loginUserHandler, logout } from "../controller/auth.controller";
import { trycatchHandler } from "../utils/trycatch.handler";
const router = Router()
    //auth routes
router.post("/register",trycatchHandler(createUserHandler))
router.post("/login", trycatchHandler(loginUserHandler))
router.post("/logout", logout)
router.get("/forgot-password",getPasswordHandler)
router.post("/forgot-password",createPasswordHandler)
router.get("/reset-password/:user_id/:token", getResetPasswordHandler)
router.post("/reset-password/:user_id/:token",createResetPasswordHandler)

export default router