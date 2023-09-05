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
exports.addToCartHandler = exports.removeFromCartHandler = exports.CartTotalHandler = void 0;
const session_service_1 = require("../service/session.service");
function CartTotalHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const cart = req.session.cart || [];
        const cartTotal = yield (0, session_service_1.calculateCartTotal)(cart);
        console.log("cart", cartTotal);
        return res.status(200).json(cartTotal);
    });
}
exports.CartTotalHandler = CartTotalHandler;
function removeFromCartHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.removeFromCartHandler = removeFromCartHandler;
function addToCartHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.addToCartHandler = addToCartHandler;
