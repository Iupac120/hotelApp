
import { Request, Response } from "express";
import { CartItem } from "../models/session.model";
import {Session} from "express-session";
import { calculateCartTotal } from "../service/session.service";

interface CustomSession extends Session {
  cart?: CartItem[]; // Explicitly define it as an array of CartItem
}

interface CustomRequest extends Request {
  session: CustomSession;
}

export async function CartTotalHandler(req: CustomRequest, res: Response) {
  const cart: CartItem[] = req.session.cart || [];
  const cartTotal = await calculateCartTotal(cart);
  console.log("cart",cartTotal)
  return res.status(200).json(cartTotal);
}

export async function removeFromCartHandler(req: CustomRequest, res: Response) {
  const { item_id }: { item_id: number } = req.body;
  const cart: CartItem[] = req.session.cart || [];

  const existingItemIndex = cart.findIndex(item => item.item_id === item_id);

  if (existingItemIndex !== -1) {
    cart.splice(existingItemIndex, 1);
    req.session.cart = cart;
    res.send('Item removed from the cart successfully!');
  } else {
    res.status(404).send('Item not found in the cart.');
  }
}

export async function addToCartHandler(req: CustomRequest, res: Response) {
  const { item_id, item_name, quantity, price }: CartItem = req.body;
  const cart: CartItem[] = req.session.cart ? req.session.cart : [];

  const existingItemIndex = cart.findIndex(item => item.item_id === item_id);

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      item_id,
      item_name,
      quantity,
      price,
    });
  }

  req.session.cart = cart;
  res.send('Item added to the cart successfully!');
}

