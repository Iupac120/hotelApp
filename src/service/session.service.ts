
// import { FilterQuery, UpdateQuery } from 'mongoose';
// import sessionModel,{SessionDocument} from '../models/session.model';
// import { verifyJwt } from '../utils/jwt.utils';
// import { get } from 'lodash';
// import { findUser } from './user.service';
// import config from "config"
// import { signJwt } from '../utils/jwt.utils';

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

export async function calculateCartTotal(cart: Cart) {
    let totalQuantity = 0;
    let totalPrice = 0;
  
    for (const itemId in cart) {
      const item = cart[itemId];
      totalQuantity += item.quantity;
      totalPrice += item.quantity * item.price;
    }
  
    return {
      totalQuantity,
      totalPrice,
    };
  }
  
  export async function addItem (input:CartItem) {
    const { item_id, item_name, quantity, price } = input;
    const cart: Cart = req.session.cart || {};
  
    if (cart[item_id]) {
      cart[item_id].quantity += quantity;
    } else {
      cart[item_id] = {
        item_id,
        item_name,
        quantity,
        price,
      };
    }
  
    req.session.cart = cart;
    return req.session.cart;
  });
  

  app.post('/remove-quantity-from-cart', (req, res) => {
    const { item_id, quantity } = req.body;
    const cart: Cart = req.session.cart || {};
  
    if (cart[item_id]) {
      // Reduce the quantity in the cart or remove the item if the quantity becomes zero or less
      cart[item_id].quantity = Math.max(0, cart[item_id].quantity - quantity);
  
      if (cart[item_id].quantity === 0) {
        delete cart[item_id];
      }
  
      req.session.cart = cart;
      res.send('Quantity removed from the cart successfully!');
    } else {
      res.status(404).send('Item not found in the cart.');
    }
  });
  
  export async function removeItem (input:CartItem) {
    const { item_id } = input;
    const cart: Cart = req.session.cart || {};
  
    if (cart[item_id]) {
      delete cart[item_id];
      req.session.cart = cart;
      res.send('Item removed from the cart successfully!');
    } else {
      res.status(404).send('Item not found in the cart.');
    }
  });
  
  app.post('/update-quantity', (req, res) => {
    const { item_id, new_quantity } = req.body;
    const cart: Cart = req.session.cart || {};
  
    if (cart[item_id]) {
      cart[item_id].quantity = new_quantity;
      req.session.cart = cart;
      res.send('Item quantity updated in the cart successfully!');
    } else {
      res.status(404).send('Item not found in the cart.');
    }
  });
  
  export async function getTotal () {
    const cart: Cart = req.session.cart || {};
    const cartTotal = calculateCartTotal(cart);
    return cartTotal;
  });
  