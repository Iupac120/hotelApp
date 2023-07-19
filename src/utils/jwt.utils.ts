//import * as jwt  from "jsonwebtoken";
import jwt  from "jsonwebtoken";
import config from "config";
import dotenv from "dotenv"
dotenv.config()
const privateKey = process.env.PRIVATEKEY
const publicKey = process.env.PUBLICKEY
// const privateKey = config.get<string>("privateKey")
// const publicKey = config.get<string>("publicKey")

export function signJwt(object:Object,options?:jwt.SignOptions | undefined){
    return jwt.sign(object,privateKey, {
        ...(options && options),//if only there is option and it is defined
        algorithm:"RS256"
    })
}
export function verifyJwt(token:string){
    try {
        const decoded = jwt.verify(token,publicKey)
        return {
            valid: true,
            expired: false,
            decoded
         }
    } catch (e:any) {
         return {
            valid: false,
            expired:e.message === "jwt expired",
            decoded: null
         }
    }
}