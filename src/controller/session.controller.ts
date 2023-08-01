import { Request,Response} from "express";
//import { validatePassword } from "../service/user.service";
import { findSessions, updateSession} from "../service/session.service";
import { createSession } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";

// export async function createUserSesionHandler (req:Request,res:Response){
//     try{
//     //validate user's password
//     const user = await validatePassword(req.body)
//     if(!user) return res.status(401).send("Invalid email or password")
//     //create a session
//     const userAgent = req.get("user-agent") || "";

//     const session = await createSession(user._id, userAgent) //user agent fro req body or from empty string
//     //create an acess token
//     console.log("seesion",session)
//     console.log("user",user)
//     console.log("agent",userAgent)
//     const accessToken = signJwt({user,session:session._id},{
//         expiresIn:config.get("accessTokenTtl")
//     })
//     console.log("one")
//     //create a refresh token
//     const refreshToken = signJwt({user,session:session._id},{
//         expiresIn:config.get("refreshTokenTtl")
//     })

//     //store access and refresh token in cookie
//     res.cookie("accessToken",accessToken,{
//         httpOnly: true,
//         domain:config.get("localhost"),
//         path:config.get("path"),
//         sameSite: "strict", 
//         secure: false,//production is true 
//         maxAge:900000})//15mins

//         res.cookie("refreshToken",refreshToken,{
//         httpOnly: true,
//         domain:config.get("localhost"),
//         path:config.get("path"),
//         sameSite: "strict", 
//         secure: false,//production is true 
//         maxAge:900000})//15mins
//     //return a refresh and acesss token

//     return res.send({accessToken,refreshToken}) 
//     }catch(e:any){
//         console.log("error",e)
//         res.status(500).json(e.message)
//     }
// }

export async function getUserSesionHandler(req:Request,res:Response){
    console.log(res.locals.user.user._id)
    const userId = res.locals.user.user._id
    console.log("user",userId)
    const sessions = await findSessions({user:userId,valid:true})
    return res.send(sessions)
}


export async function deleteUserSessionHandler(req:Request,res:Response){
    const sessionId = res.locals.user.session
    console.log("delete",sessionId)
    await updateSession({_id:sessionId},{valid:false})
    return res.send({
        accessToken: null,
        refreshToken:null
    })
}