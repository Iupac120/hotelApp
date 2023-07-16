import {Request,Response} from 'express';
import { createUser } from '../service/user.service';
import logger from '../utils/logger';
import { createUserInput } from '../schema/user.schema';

export async function createUserHandler(req:Request<{},{},createUserInput["body"]>,res:Response){
    try {
        const user =  await createUser(req.body);//call service
        return user;
    } catch (e:any) {
        logger.error(e)
        return res.status(409).send(e.message)
    }
}

export default createUserHandler