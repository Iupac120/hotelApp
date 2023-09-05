"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderQuery = exports.updateOrderQuery = exports.findOrderIdQuery = exports.findOrderQuery = exports.findAllOrderQuery = exports.addOrderQuery = exports.checkUserQuery = exports.insertOrderQuery = void 0;
exports.insertOrderQuery = `
      INSERT INTO orders (email) VALUES ($1)
      RETURNING order_id;
    `;
exports.checkUserQuery = "SELECT FROM users WHERE user_id = $1";
exports.addOrderQuery = "INSERT INTO orders (title, type, description, price, image, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
exports.findAllOrderQuery = "SELECT * FROM orders";
exports.findOrderQuery = "SELECT FROM orders WHERE orders_id = $1 OR title = $2";
exports.findOrderIdQuery = "SELECT FROM orders WHERE orders_id = $1";
exports.updateOrderQuery = "UPDATE orders SET title = $1, type = $2, description = $3, price = $4, image = $5, user_id = $6 WHERE orders_id = $7";
exports.deleteOrderQuery = "DELETE FROM orders WHERE orders_id = $1";
