import {Request,Response} from 'express';
 import { omit } from 'lodash';
 import { createUser, loginUser } from '../service/user.service';
 import logger from '../utils/logger';
 import { createUserInput } from '../schema/user.schema';
 import config from "config";
 import { signJwt } from '../utils/jwt.utils';

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
    const userAgent = req.get("user-agent") || "";
    //create an acess token
    console.log("user",user)
    console.log("agent",userAgent)
    const accessToken = signJwt({id:user.user_id,isAdmin:user.is_admin,userAgent},{
        expiresIn:config.get("accessTokenTtl")
    })
    console.log("one")
    //create a refresh token
    const refreshToken = signJwt({id:user.user_id,isAdmin:user.is_admin,userAgent},{
        expiresIn:config.get("refreshTokenTtl")
    })
    console.log("two")
    //store access and refresh token in cookie
    res.cookie("accessToken",accessToken,{
        httpOnly: true,
        domain:config.get("localhost"),
        path:config.get("path"),
        sameSite: "strict", 
        secure: false,//production is true 
        maxAge:900000
    })//15mins

    res.cookie("refreshToken",refreshToken,{
        httpOnly: true,
        domain:config.get("localhost"),
        path:config.get("path"),
        sameSite: "strict", 
        secure: false,//production is true 
        maxAge:900000
    })//15mins
    //return a refresh and acesss token

    return res.send({accessToken,refreshToken}) 
    //return res.status(201).json(user)
 }