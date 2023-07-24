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

 export async function getUserHandler(req:Request,res:Response){
     return res.send(res.locals.user)
 }


// import {Request,Response} from "express";
// import bcrypt from "bcrypt";
// import config from "config";
// import pool from '../database/db';
// import { addUser, checkEmail } from '../service/user.service';
// import { UserDocument } from '../models/user.model';

// export async function createUserHandler (input:UserDocument,req:Request,res:Response){
//     const salt =  await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
//     const {username,email,password} = req.body
//     const emailExist = await pool.query(checkEmail,[email])
//     if((await emailExist).rows.length){
//         res.status(201).json({message:"Email already exists"})
//     }
//     const hashedPassword = await bcrypt.hash(password,salt)
//     const user = pool.query(addUser,[username, email, hashedPassword])
// }