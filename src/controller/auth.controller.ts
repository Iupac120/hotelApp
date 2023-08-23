import {NextFunction, Request,Response} from 'express';
 import { omit } from 'lodash';
 import { createUser, createUserPassword, createUserResetPassword, loginUser, resendVerifyUserOtp, verifyUserOtp } from '../service/user.service';
 import logger from '../utils/logger';
 import { createUserInput } from '../schema/user.schema';
 import config from "config";
 import { signJwt } from '../utils/jwt.utils';
import pool from '../utils/connect';
import { getUserById } from '../queries/user.queries';
import { NotFoundError } from '../errors/error.handler';

 export async function createUserHandler(req:Request<{},{},createUserInput["body"]>,res:Response){
         const user =  await createUser(req.body);//call service
         //return res.send(omit(user,"password"));//omit the user to json object
         return res.status(201).json(`Sign up otp has been sent to your email:${user.email}`);
 }

 //login controller
 export async function loginUserHandler(req:Request,res:Response, next:NextFunction){
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

    return res.status(201).json({accessToken,refreshToken}) 
    //return res.status(201).json(user)
 }


 export async function logout(req:Request, res:Response){
    res.cookie("accessToken","", {
        path:config.get("path"),
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure:false//production is true
    })
    return res.status(200).json({message:"You have succesfully logged out"})
 }

 
export async function getPasswordHandler(req:Request,res:Response){
    return res.status(201).json("render forgot password page")
}

export async function createPasswordHandler(req:Request,res:Response){
    await createUserPassword(req.body)
    return res.status(201).json({message:`Password reset link send to your ${req.body.email}`})
}

export async function createResetPasswordHandler(req:Request,res:Response){
    const userId = Number(req.params.user_id)
    const token = req.params.token
    await createUserResetPassword(req.body,userId,token)
    return res.status(201).json({message:"Password reset"})
}
//
export async function getResetPasswordHandler(req:Request,res:Response){
    return res.status(201).json("render reset password page")
}

export async function verifyUserOtpHandler(req:Request,res:Response){
    const input = req.body.otp
    const otpEmail = req.body.email
    await verifyUserOtp(input,otpEmail)
    return res.status(201).json({message:"Email verification success"})
}

export async function createResetOtpHandler(req:Request, res:Response){
    const input = req.body.email
    const user = await resendVerifyUserOtp(input)
    res.status(201).json({message:`A new otp has been sent to your email:${user.email}`})
}