import express from "express"
import { checkout, getAllOrderHandler, getOrderHandler, paymentCheckout, updateOrderHandler } from "../controller/order.controller"
const router = express.Router()

router.get('/create-order',checkout)
router.post('/create-order',paymentCheckout)
router.get("/", getAllOrderHandler)
router.get("/:orderId", getOrderHandler)
router.put("/:orderId", updateOrderHandler)
router.delete("/:orderId", updateOrderHandler)


export default router