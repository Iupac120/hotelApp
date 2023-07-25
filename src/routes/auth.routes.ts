import {Router} from "express";
import { createUserHandler, loginUserHandler } from "../controller/auth.controller";
import { trycatchHandler } from "../utils/trycatch.handler";
const router = Router()
    //auth routes
router.post("/register",trycatchHandler(createUserHandler))
router.post("/login", trycatchHandler(loginUserHandler))


export default router