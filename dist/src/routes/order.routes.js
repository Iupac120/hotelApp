"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controller/order.controller");
const router = express_1.default.Router();
router.get('/create-order', order_controller_1.checkout);
router.post('/create-order', order_controller_1.paymentCheckout);
router.get("/", order_controller_1.getAllOrderHandler);
router.get("/:orderId", order_controller_1.getOrderHandler);
router.put("/:orderId", order_controller_1.updateOrderHandler);
router.delete("/:orderId", order_controller_1.updateOrderHandler);
exports.default = router;
