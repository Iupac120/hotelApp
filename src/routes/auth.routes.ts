import {Router} from "express";
import { createUserHandler, loginUserHandler } from "../controller/auth.controller";
const router = Router()
    //auth routes
router.post("/register",createUserHandler)
router.post("/login", loginUserHandler)


export default router