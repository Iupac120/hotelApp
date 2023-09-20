import {Request,Response} from 'express'
import { CreateProductInput, DeleteProductInput, GetProductInput, UpdateProductInput } from '../schema/product.schema.js';
import { createProduct, deleteProduct, findAllProduct, findProduct, updateProduct } from "../service/product.service.js"
import { NotBeforeError } from 'jsonwebtoken';
import { NotFoundError, UnAuthorizedError } from '../errors/error.handler.js';
import config from "config"
import dotenv from 'dotenv';
import Stripe from "stripe";
import pool from '../utils/connect.js';
import { insertOrderQuery } from '../queries/order.queries.js';
dotenv.config()
import {Session} from "express-session";
import { CartItem } from '../models/session.model.js';
import { deleteOrder, findAllOrder, findOrder, updateOrder } from '../service/order.service.js';

interface CustomSession extends Session {
  cart?: CartItem[]; // Explicitly define it as an array of CartItem
}

interface CustomRequest extends Request {
  session: CustomSession;
}



// Create a Stripe instance
const stripe = new Stripe(config.get<string>("stripe"), {
  apiVersion: '2023-08-16', // Use the latest API version
});

//checkout route
export async function checkout (req:CustomRequest,res:Response) {
  try{
  if(!req.session.cart){
      return UnAuthorizedError
  }
  const cart:CartItem[] = req.session.cart || []
  res.status(201).json({total:cart})
  }catch(err){
      res.status(500).json(err)
  }
}


// Create an order in your PostgreSQL database and retrieve order_id
export async function paymentCheckout(req:Request, res:Response) {
  const { items, email, paymentMethodId, amount } = req.body; 
  let order_id;

  try {
    // Insert order into PostgreSQL and retrieve the generated order_id
    const { rows } = await pool.query(insertOrderQuery, [email]);
    order_id = rows[0].order_id;

    // Create a Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,//calculateTotalAmount(items),
      currency: 'usd',
      payment_method_types: ['card'],
      payment_method: paymentMethodId,
      //customer_email: email,
      metadata: {
        order_id: order_id.toString(),
      },
    });

    // Return payment intent's client secret and order_id to the client
    res.json({ clientSecret: paymentIntent.client_secret, order_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the order.' });
  }
}



// function calculateTotalAmount(items) {
//   // Calculate and return the total amount based on items
// }
// router.post("/checkout",userAuthMiddleWare,(req,res) =>{
//     if(!req.session.cart){
//         throw new UnAuthorizedError("Access denied")
//     }
//     const cart = new Cart(req.session.cart)
//         stripe.charges.create({
//             source: req.body.tokenId,
//             amount:req.body.amount,//cart.totalPrice*100,//req.body.amount
//             currency:'USD'
//         },async (stripeErr,stripeRes) => {
//             if(stripeErr){
//                 res.status(500).json(stripeErr)
//             }else{
//                  const order = new Order({
//                      user:req.user._id,//req.body.user
//                      cart:cart,//req.body.cart
//                      deliveryAddress:stripeRes.source.address_city,//req.body.address,//from the request body of the stripe
//                      name:stripeRes.source.name,//from the request body of the stripe
//                      isPaid:stripeRes.paid,
//                      totalPrice:stripeRes.amount,
//                      paidAt:Date.now(),
//                      paymentMethod:stripeRes.payment_method,
//                      paymentResult:{
//                          id:stripeRes.id,
//                          status:stripeRes.status,
//                          update_time:Date.now(),
//                          email_address:stripeRes.billing_details.email
//                      }
//                  })
//                  await order.save()
//                 req.session.cart = null;
//                 res.status(200).json(stripeRes)
//               }
//          })
//     }
// )



export async function getAllOrderHandler (req:Request<GetProductInput['params']>,res:Response){
    const order = await findAllOrder()
    if(!order){
         return new NotFoundError("order not found")
    }
    return res.send(order)
}

export async function getOrderHandler (req:Request,res:Response){
    const orderId = Number(req.params.orderId)
    const body = req.body
    const order = await findOrder(orderId,body)
    if(!order){
         return new NotFoundError("Order not found")
    }
    return res.send(order)
}

export async function updateOrderHandler (req:Request,res:Response){
    const userId = Number(res.locals.user._id)
    const orderId = Number(req.params.orderId)
    const body = req.body
    const order = await updateOrder(userId,orderId,body)
    if(!order){
         return new NotFoundError("Order not found")
    }
    return res.send(order)
}

export async function deleteOrderHandler(req:Request,res:Response){
    const userId = Number(res.locals.user._id)
    const orderId = Number(req.params.orderId)
    const order = await deleteOrder(userId,orderId)
    if(!order) return new NotFoundError("Order not found")
    return res.send(order)
}




                                                                    



