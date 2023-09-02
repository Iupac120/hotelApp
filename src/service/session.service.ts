
import { FilterQuery, UpdateQuery } from 'mongoose';
//import sessionModel,{SessionDocument} from '../models/session.model';
import { verifyJwt } from '../utils/jwt.utils';
import {Request,Response} from "express"
import { get } from 'lodash';
import pool from '../utils/connect';
//import { findUser } from './user.service';
import config from "config"
import { signJwt } from '../utils/jwt.utils';

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

import {Cart, CartItem, CartTotal} from "../models/session.model"
import { UnAuthorizedError } from '../errors/error.handler';
import { findSession } from '../queries/session.queries';
import { findUserSession } from '../queries/auth.queries';

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
  
  
  export async function reIssueAccessToken({refreshToken}:{refreshToken:string}){
    const {decoded}  = verifyJwt(refreshToken)
    console.log("decoded",decoded)
    if(!decoded) throw new UnAuthorizedError("Token does not exist");
    const id = decoded?.id
    const user = await pool.query(findUserSession,)
    if(!user) return false
    const accesToken = signJwt({...user,session:session._id},{
        expiresIn:config.get("accessTokenTtl")
    })
    return accesToken
}