import {Request,Response} from 'express';
 import { omit } from 'lodash';
 import { createUser, loginUser } from '../service/user.service';
 import logger from '../utils/logger';
 import { createUserInput } from '../schema/user.schema';

 export async function createUserHandler(req:Request<{},{},createUserInput["body"]>,res:Response){
     try {
         const user =  await createUser(req.body);//call service
         return res.send(omit(user,"password"));//omit the user to json object
     } catch (e:any) {
         logger.error(e)
         console.log(e)
         return res.status(409).send(e.message)
    }
 }

 export async function loginUserHandler(req:Request,res:Response){
    const user =  await loginUser(req.body)
    return res.status(201).json(user)
 }