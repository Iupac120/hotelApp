import express from "express"
import { checkout, paymentCheckout } from "../controller/order.controller"
const router = express.Router()

router.get('/create-order',checkout)
router.post('/create-order',paymentCheckout)


export default router