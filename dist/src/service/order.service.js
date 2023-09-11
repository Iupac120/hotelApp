"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.findOrder = exports.findAllOrder = void 0;
const error_handler_1 = require("../errors/error.handler");
const order_queries_1 = require("../queries/order.queries");
const product_queries_1 = require("../queries/product.queries");
const connect_1 = __importDefault(require("../utils/connect"));
// export async function createOrder(){
//     const getOrder = await pool.query()
// }
async function findAllOrder() {
    const orders = await connect_1.default.query(order_queries_1.findAllOrderQuery);
    if (!orders.rows.length)
        return error_handler_1.NotFoundError;
    return orders.rows;
}
exports.findAllOrder = findAllOrder;
async function findOrder(orderId, orderTitle) {
    const order = await connect_1.default.query(order_queries_1.findOrderQuery, [orderId, orderTitle.title]);
    if (!order.rows.length)
        return error_handler_1.NotFoundError;
    return order.rows[0];
}
exports.findOrder = findOrder;
async function updateOrder(userId, orderId, input) {
    const adminExist = await connect_1.default.query(product_queries_1.checkUserQuery, [userId]);
    if (!adminExist.rows.length)
        return error_handler_1.UnAuthorizedError;
    const order = await connect_1.default.query(order_queries_1.findOrderIdQuery, [orderId]);
    if (!order.rows.length)
        return error_handler_1.NotFoundError;
    const updateProd = await connect_1.default.query(order_queries_1.updateOrderQuery, [
        input.title, input.type, input.description, input.price, input.image, userId, orderId
    ]);
    if (!updateProd.rows.length)
        return error_handler_1.BadRequestError;
    return updateProd.rows;
}
exports.updateOrder = updateOrder;
async function deleteOrder(userId, orderId) {
    const adminExist = await connect_1.default.query(product_queries_1.checkUserQuery, [userId]);
    if (!adminExist.rows.length)
        return error_handler_1.UnAuthorizedError;
    const deleteOrder = await connect_1.default.query(order_queries_1.deleteOrderQuery, [orderId]);
    if (!deleteOrder.rows.length)
        return error_handler_1.BadRequestError;
    return deleteOrder.rows[0];
}
exports.deleteOrder = deleteOrder;
