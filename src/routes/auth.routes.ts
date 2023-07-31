import {Router} from "express";
import { createUserHandler, loginUserHandler, logout } from "../controller/auth.controller";
import { trycatchHandler } from "../utils/trycatch.handler";
const router = Router()
    //auth routes
router.post("/register",trycatchHandler(createUserHandler))
router.post("/login", trycatchHandler(loginUserHandler))
router.post("/logout", logout)

export default router