import {Request,Response,NextFunction} from "express";
import getLodash from "lodash";//to get a property that your not certain it exists
const { get } = getLodash;//to get a property that your not certain it exists
import { verifyJwt } from "../utils/jwt.utils.js";
import config from "config";
import { reIssueAccessToken } from "../service/session.service.js";
import { createCustomError } from "../errors/authentic.error.js";
import { UnAuthorizedError } from "../errors/error.handler.js";
import { Cookie } from "express-session";

export async function deserializeUser (req:Request,res:Response,next:NextFunction) {
    const accessToken = get(req,"cookies.accessToken") || get(req,"headers.authorization","").replace(/^Bearer\s/,"")
    
    const refreshToken = get(req,"cookies.refreshToken") || get(req,"headers.x-refresh")
console.log("access", accessToken)
console.log("refresh", refreshToken)
console.log("req", req.headers)
    if(!accessToken){
        //throw new UnAuthorizedError("Access denied, login")
        return next()
    }
    const {decoded, expired} = verifyJwt(accessToken)
    if(decoded){
        res.locals.user = decoded //assigns decoded to req.locals.user
        console.log("local",res.locals.user)
        return next()
    }

    if(expired && refreshToken){
        console.log("refresh",refreshToken)
        let newAccessToken:any  = await reIssueAccessToken(refreshToken,req)
        console.log("type",typeof(newAccessToken))
        if(typeof newAccessToken === "string"){
            res.setHeader("x-access-token",newAccessToken)
            res.cookie("accessToken",newAccessToken,{
                httpOnly: true,
                domain:config.get("localhost"),
                path:config.get("path"),
                sameSite: "strict", 
                secure: false,//production is true 
                maxAge:900000})//15mins
        }

        const result = verifyJwt(newAccessToken)
        res.locals.user = result.decoded;
        return next()
    }
    return next()
}

export async function verifyUser (req:Request,res:Response,next:NextFunction){
    return deserializeUser(req,res,()=>{
        if(res.locals.user.id === req.params.userId || res.locals.user.isAdmin){
            return next()
        }else{
            return next(createCustomError("You are not authenticated",401))
        }
    })
}

export async function verifyAdmin (req:Request,res:Response,next:NextFunction){
    return deserializeUser(req,res,()=>{
        console.log("isAdmin",res.locals.user)
        if(res.locals.user.isAdmin){
            return next()
        }else{
            return next(createCustomError("You are not authenticated",401))
        }
    })
}