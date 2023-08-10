import {Request,Response} from 'express'
import { CreateProductInput, DeleteProductInput, GetProductInput, UpdateProductInput } from '../schema/product.schema';
import { createProduct, deleteProduct, findAllProduct, findProduct, updateProduct } from "../service/product.service"
import { NotBeforeError } from 'jsonwebtoken';
import { NotFoundError, UnAuthorizedError } from '../errors/error.handler';
import config from "config"
import dotenv from 'dotenv';
import Stripe from 'stripe';
import pool from '../utils/connect';
import { insertOrderQuery } from '../queries/order.queries';
dotenv.config()
import {Session} from "express-session";
import { CartItem } from '../models/session.model';
import { deleteOrder, findAllOrder, findOrder, updateOrder } from '../service/order.service';

interface CustomSession extends Session {
  cart?: CartItem[]; // Explicitly define it as an array of CartItem
}

interface CustomRequest extends Request {
  session: CustomSession;
}



// Create a Stripe instance
const stripe = new Stripe(config.get<string>("stripe"), {
  apiVersion: '2022-11-15', // Use the latest API version
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
    const product = await findAllOrder()
    if(!product){
         return NotFoundError
    }
    return res.send(product)
}

export async function getOrderHandler (req:Request<GetProductInput['params']>,res:Response){
    const productId = Number(req.params.productId)
    const body = req.body
    const product = await findOrder(productId,body)
    if(!product){
         return NotFoundError
    }
    return res.send(product)
}

export async function updateOrderHandler (req:Request<GetProductInput['params']>,res:Response){
    const userId = Number(res.locals.user._id)
    const productId = Number(req.params.productId)
    const body = req.body
    const product = await updateOrder(userId,productId,body)
    if(!product){
         return NotFoundError
    }
    return res.send(product)
}

export async function deleteOrderHandler(req:Request,res:Response){
    const userId = Number(res.locals.user._id)
    const productId = Number(req.params.productId)
    const product = await deleteOrder(userId,productId)
    if(!product) return NotFoundError
    return res.send(product)
}




                                                                    



