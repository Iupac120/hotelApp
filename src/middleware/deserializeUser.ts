import {Request,Response,NextFunction} from "express";
import { get } from "lodash";//to get a property that your not certain it exists
import { verifyJwt } from "../utils/jwt.utils";

const deserializeUser = (req:Request,res:Response,next:NextFunction) => {
    const accessToken = get(req,"headers.authorization","").replace(/^Bearer\s/,"")
    if(!accessToken){
        return next()
    }
    const {decoded, expired} = verifyJwt(accessToken)

    if(decoded){
        res.locals.user = decoded //assigns locals to users
        return next()
    }

    return next()
}

export default deserializeUser