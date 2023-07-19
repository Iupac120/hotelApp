import {Express,Request,Response} from 'express';
import {createUserHandler} from "./controller/user.controller";
import validateResource from './middleware/validateResources';
import { createUserSchema } from './schema/user.schema';
import { createUserSesionHandler, deleteUserSessionHandler, getUserSesionHandler } from './controller/session.controller';
import { createSessionSchema } from './schema/session.schema';
import requireUser from './middleware/requireUser';
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from './controller/product.controller';
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from './schema/product.schema';


function routes(app:Express){
    app.get("/",(req:Request,res:Response) => {
        res.sendStatus(200)
    })
    //user routes
    app.post("/api/users",validateResource(createUserSchema),createUserHandler)
    //sesion routes
    app.post("/api/sessions",validateResource(createSessionSchema),createUserSesionHandler)
    app.get("/api/sessions",requireUser,getUserSesionHandler)
    app.delete("/api/sessions",requireUser,deleteUserSessionHandler)
    //product routes
    app.post("/api/product",[requireUser,validateResource(createProductSchema)],createProductHandler)
    app.get("/api/product",[validateResource(getProductSchema)],getProductHandler)
    app.put("/api/product/productId",[requireUser,validateResource(updateProductSchema)],updateProductHandler)
    app.delete("/api/product/productId",[requireUser,validateResource(deleteProductSchema)],deleteProductHandler)
}

export default routes