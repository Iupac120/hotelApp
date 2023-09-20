
//import sessionModel,{SessionDocument} from '../models/session.model';
import { verifyJwt } from '../utils/jwt.utils.js';
import {Request,Response} from "express"
import { get } from 'lodash';
import pool from '../utils/connect.js';
//import { findUser } from './user.service';
import config from "config"
import { signJwt } from '../utils/jwt.utils.js';

// export async function createSession (userId:string,userAgent:string){
//     try {
//         const session  = await sessionModel.create({user:userId,userAgent})
//         return session.toJSON()
//     } catch (e:any) {
//         throw new Error(e)
//     }
// }

// export async function findSessions(query:FilterQuery<SessionDocument>){
//     return sessionModel.find(query).lean();//lean means it will get only the query object
// }

// export async function updateSession(query:FilterQuery<SessionDocument>,update:UpdateQuery<SessionDocument>){
//     return sessionModel.updateOne(query,update)
// }

// export async function reIssueAccessToken({refreshToken}:{refreshToken:string}){
//     const {decoded}  = verifyJwt(refreshToken)
//     if(!decoded || !get(decoded,"session") ) return false;
//     const session = await sessionModel.findById(get(decoded,"session"))
//     if(!session || !session.valid) return false

//     const user = await findUser({_id:session.user})
//     if(!user) return false
//     const accesToken = signJwt({...user,session:session._id},{
//         expiresIn:config.get("accessTokenTtl")
//     })
//     return accesToken
// }

import {Cart, CartItem, CartTotal} from "../models/session.model.js"
import { UnAuthorizedError } from '../errors/error.handler.js';
//import { findSession } from '../queries/session.queries.js';
import { findUserSession } from '../queries/auth.queries.js';

export async function calculateCartTotal(cart: Cart) {
    let totalQuantity = 0;
    let totalPrice = 0;
  
    for (const itemId in cart) {
      const item = cart[itemId];
      console.log("item",item)
      totalQuantity += item.quantity;
      totalPrice += item.quantity * item.price;
      console.log("item",totalPrice, totalQuantity)
    }
  
    return {
      totalQuantity,
      totalPrice,
    };
  }
  
  
  export async function reIssueAccessToken(refreshToken:string,req:Request){
    console.log("decodedRefresh",refreshToken)
    const decoded  = verifyJwt(refreshToken)
    console.log("decoded",decoded)
    if(!decoded) throw new UnAuthorizedError("Token does not exist");
    const {id}:any = decoded.decoded
    console.log("id", id)
    const user = await pool.query(findUserSession,[id])
    if(!user) throw new UnAuthorizedError("User does not exist")
    console.log("user",user.rows[0])
    const newuser = user.rows[0] 
    const userAgent = req.get("user-agent") || "";
    const accesToken = signJwt({...newuser,id:newuser.user_id,isAdmin:newuser.is_admin,userAgent},{
        expiresIn:config.get("accessTokenTtl")
    })
    return accesToken
}