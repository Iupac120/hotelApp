import express from "express";
const router = express.Router()
import {Express,Request,Response} from 'express';
import {/*createUserHandler,*/  deleteUser, getAllUsers, getUser, /*getUserHandler,*/ updateUser} from "../controller/user.controller.js";
import validateResource from '../middleware/validateResources.js';
import { createUserSchema } from '../schema/user.schema.js';
import { createSessionSchema } from '../schema/session.schema.js';
import requireUser from '../middleware/requireUser.js';
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from '../controller/product.controller.js';
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from '../schema/product.schema.js';



router.get("/",(req:Request,res:Response) => {
        res.send("This is hotel booking app")
    })

    //user routes
router.get("/", getAllUsers)
router.get("/:userId",getUser)
router.put("/:userId", updateUser)
router.delete("/:userId", deleteUser)

        


//router.post("/",validateResource(createUserSchema),createUserHandler)
//router.get("/",requireUser,getUserHandler)

    // //sesion routes
    // app.post("/api/sessions",validateResource(createSessionSchema),createUserSesionHandler)
    // app.get("/api/sessions",requireUser,getUserSesionHandler)
    // app.delete("/api/sessions",requireUser,deleteUserSessionHandler)
    // //product routes
    // app.post("/api/product",[requireUser,validateResource(createProductSchema)],createProductHandler)
    // app.get("/api/product",[validateResource(getProductSchema)],getProductHandler)
    // app.put("/api/product/productId",[requireUser,validateResource(updateProductSchema)],updateProductHandler)
    // app.delete("/api/product/productId",[requireUser,validateResource(deleteProductSchema)],deleteProductHandler)


export default router