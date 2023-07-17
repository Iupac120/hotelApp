import { Request,Response} from "express";
import { findSesssions, validatePassword } from "../service/user.service";
import { createSession } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";

export async function createUserSesionHandler (req:Request,res:Response){
    //validate user's password
    const user = await validatePassword(req.body)
    if(!user) return res.status(401).send("Invalid email or password")
    //create a session
    const session = await createSession(user._id, req.get("user-agent" || "")) //user agent fro req body or from empty string
    //create an acess token
    const accesToken = signJwt({...user,session:session._id},{
        expiresIn:config.get("accessTokenTtl")
    })
    //create a refresh token
    const refreshToken = signJwt({...user,session:session._id},{
        expiresIn:config.get("accessTokenTtl")
    })
    //return a refresh and acesss token

    return res.send({accesToken,refreshToken}) 
}

export async function getUserSesionHandler(req:Request,res:Response){
    const userId = res.locals.user._id
    const sessions = await findSesssions({user:userId,valid:false})
    return res.send(sessions)
}