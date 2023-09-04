import express from "express";
const router = express.Router()
import {Express,Request,Response} from 'express';
import {/*createUserHandler,*/  deleteUser, getAllUsers, getUser, /*getUserHandler,*/ updateUser} from "../controller/user.controller";
import validateResource from '../middleware/validateResources';
import { createUserSchema } from '../schema/user.schema';
import { createSessionSchema } from '../schema/session.schema';
import requireUser from '../middleware/requireUser';
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from '../controller/product.controller';
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from '../schema/product.schema';



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