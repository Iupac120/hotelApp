"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCartHandler = exports.removeFromCartHandler = exports.CartTotalHandler = void 0;
const session_service_1 = require("../service/session.service");
async function CartTotalHandler(req, res) {
    const cart = req.session.cart || [];
    const cartTotal = await (0, session_service_1.calculateCartTotal)(cart);
    console.log("cart", cartTotal);
    return res.status(200).json(cartTotal);
}
exports.CartTotalHandler = CartTotalHandler;
async function removeFromCartHandler(req, res) {
    const { item_id } = req.body;
    const cart = req.session.cart || [];
    const existingItemIndex = cart.findIndex(item => item.item_id === item_id);
    if (existingItemIndex !== -1) {
        cart.splice(existingItemIndex, 1);
        req.session.cart = cart;
        res.send('Item removed from the cart successfully!');
    }
    else {
        res.status(404).send('Item not found in the cart.');
    }
}
exports.removeFromCartHandler = removeFromCartHandler;
async function addToCartHandler(req, res) {
    const { item_id, item_name, quantity, price } = req.body;
    const cart = req.session.cart ? req.session.cart : [];
    const existingItemIndex = cart.findIndex(item => item.item_id === item_id);
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
    }
    else {
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
exports.addToCartHandler = addToCartHandler;
