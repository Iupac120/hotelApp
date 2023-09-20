"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderHandler = exports.updateOrderHandler = exports.getOrderHandler = exports.getAllOrderHandler = exports.paymentCheckout = exports.checkout = void 0;
const error_handler_js_1 = require("../errors/error.handler.js");
const config_1 = __importDefault(require("config"));
const dotenv_1 = __importDefault(require("dotenv"));
const stripe_1 = __importDefault(require("stripe"));
const connect_js_1 = __importDefault(require("../utils/connect.js"));
const order_queries_js_1 = require("../queries/order.queries.js");
dotenv_1.default.config();
const order_service_js_1 = require("../service/order.service.js");
// Create a Stripe instance
const stripe = new stripe_1.default(config_1.default.get("stripe"), {
    apiVersion: '2023-08-16', // Use the latest API version
});
//checkout route
async function checkout(req, res) {
    try {
        if (!req.session.cart) {
            return error_handler_js_1.UnAuthorizedError;
        }
        const cart = req.session.cart || [];
        res.status(201).json({ total: cart });
    }
    catch (err) {
        res.status(500).json(err);
    }
}
exports.checkout = checkout;
// Create an order in your PostgreSQL database and retrieve order_id
async function paymentCheckout(req, res) {
    const { items, email, paymentMethodId, amount } = req.body;
    let order_id;
    try {
        // Insert order into PostgreSQL and retrieve the generated order_id
        const { rows } = await connect_js_1.default.query(order_queries_js_1.insertOrderQuery, [email]);
        order_id = rows[0].order_id;
        // Create a Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the order.' });
    }
}
exports.paymentCheckout = paymentCheckout;
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
async function getAllOrderHandler(req, res) {
    const order = await (0, order_service_js_1.findAllOrder)();
    if (!order) {
        return new error_handler_js_1.NotFoundError("order not found");
    }
    return res.send(order);
}
exports.getAllOrderHandler = getAllOrderHandler;
async function getOrderHandler(req, res) {
    const orderId = Number(req.params.orderId);
    const body = req.body;
    const order = await (0, order_service_js_1.findOrder)(orderId, body);
    if (!order) {
        return new error_handler_js_1.NotFoundError("Order not found");
    }
    return res.send(order);
}
exports.getOrderHandler = getOrderHandler;
async function updateOrderHandler(req, res) {
    const userId = Number(res.locals.user._id);
    const orderId = Number(req.params.orderId);
    const body = req.body;
    const order = await (0, order_service_js_1.updateOrder)(userId, orderId, body);
    if (!order) {
        return new error_handler_js_1.NotFoundError("Order not found");
    }
    return res.send(order);
}
exports.updateOrderHandler = updateOrderHandler;
async function deleteOrderHandler(req, res) {
    const userId = Number(res.locals.user._id);
    const orderId = Number(req.params.orderId);
    const order = await (0, order_service_js_1.deleteOrder)(userId, orderId);
    if (!order)
        return new error_handler_js_1.NotFoundError("Order not found");
    return res.send(order);
}
exports.deleteOrderHandler = deleteOrderHandler;
