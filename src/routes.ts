import {Express,Request,Response} from 'express';
import {createUserHandler} from "./controller/user.controller";
import validateResource from './middleware/validateResources';
import { createUserSchema } from './schema/user.schema';
import { createUserSesionHandler, getUserSesionHandler } from './controller/session.controller';
import { createSessionSchema } from './schema/session.schema';


function routes(app:Express){
    app.get("/healthCheck",(req:Request,res:Response) => {
        res.sendStatus(200)
    })
    //user routes
    app.post("/api/users",validateResource(createUserSchema),createUserHandler)
    //sesion routes
    app.post("/api/sessions",validateResource(createSessionSchema),createUserSesionHandler)
    app.get("/api/sessions",getUserSesionHandler)
}

export default routes