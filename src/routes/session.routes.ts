import express from 'express'
import { CartTotalHandler, addToCartHandler, removeFromCartHandler/*, removeSingleItemCartHandler, updateCartQuantityHandler*/ } from '../controller/session.controller'
const router = express.Router()


router.post('/add-to-cart', addToCartHandler)
router.post('/remove-from-cart',removeFromCartHandler)
router.get('/cart-total',CartTotalHandler)
//router.post('/update-quantity',updateCartQuantityHandler)
//router.post('/remove-quantity-from-cart',removeSingleItemCartHandler)

export default router