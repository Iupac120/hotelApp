"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const session_controller_js_1 = require("../controller/session.controller.js");
const router = express_1.default.Router();
router.post('/add-to-cart', session_controller_js_1.addToCartHandler);
router.post('/remove-from-cart', session_controller_js_1.removeFromCartHandler);
router.get('/cart-total', session_controller_js_1.CartTotalHandler);
//router.post('/update-quantity',updateCartQuantityHandler)
//router.post('/remove-quantity-from-cart',removeSingleItemCartHandler)
exports.default = router;
