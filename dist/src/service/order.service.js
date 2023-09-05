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
function findAllOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield connect_1.default.query(order_queries_1.findAllOrderQuery);
        if (!orders.rows.length)
            return error_handler_1.NotFoundError;
        return orders.rows;
    });
}
exports.findAllOrder = findAllOrder;
function findOrder(orderId, orderTitle) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = yield connect_1.default.query(order_queries_1.findOrderQuery, [orderId, orderTitle.title]);
        if (!order.rows.length)
            return error_handler_1.NotFoundError;
        return order.rows[0];
    });
}
exports.findOrder = findOrder;
function updateOrder(userId, orderId, input) {
    return __awaiter(this, void 0, void 0, function* () {
        const adminExist = yield connect_1.default.query(product_queries_1.checkUserQuery, [userId]);
        if (!adminExist.rows.length)
            return error_handler_1.UnAuthorizedError;
        const order = yield connect_1.default.query(order_queries_1.findOrderIdQuery, [orderId]);
        if (!order.rows.length)
            return error_handler_1.NotFoundError;
        const updateProd = yield connect_1.default.query(order_queries_1.updateOrderQuery, [
            input.title, input.type, input.description, input.price, input.image, userId, orderId
        ]);
        if (!updateProd.rows.length)
            return error_handler_1.BadRequestError;
        return updateProd.rows;
    });
}
exports.updateOrder = updateOrder;
function deleteOrder(userId, orderId) {
    return __awaiter(this, void 0, void 0, function* () {
        const adminExist = yield connect_1.default.query(product_queries_1.checkUserQuery, [userId]);
        if (!adminExist.rows.length)
            return error_handler_1.UnAuthorizedError;
        const deleteOrder = yield connect_1.default.query(order_queries_1.deleteOrderQuery, [orderId]);
        if (!deleteOrder.rows.length)
            return error_handler_1.BadRequestError;
        return deleteOrder.rows[0];
    });
}
exports.deleteOrder = deleteOrder;
