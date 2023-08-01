"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserSessionHandler = exports.getUserSesionHandler = void 0;
//import { validatePassword } from "../service/user.service";
const session_service_1 = require("../service/session.service");
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
function getUserSesionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(res.locals.user.user._id);
        const userId = res.locals.user.user._id;
        console.log("user", userId);
        const sessions = yield (0, session_service_1.findSessions)({ user: userId, valid: true });
        return res.send(sessions);
    });
}
exports.getUserSesionHandler = getUserSesionHandler;
function deleteUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionId = res.locals.user.session;
        console.log("delete", sessionId);
        yield (0, session_service_1.updateSession)({ _id: sessionId }, { valid: false });
        return res.send({
            accessToken: null,
            refreshToken: null
        });
    });
}
exports.deleteUserSessionHandler = deleteUserSessionHandler;
