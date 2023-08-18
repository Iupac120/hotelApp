export const insertOrderQuery = `
      INSERT INTO orders (email) VALUES ($1)
      RETURNING order_id;
    `;
export const checkUserQuery = "SELECT FROM users WHERE user_id = $1"
export const addOrderQuery = "INSERT INTO orders (title, type, description, price, image, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"
export const findAllOrderQuery = "SELECT * FROM orders"
export const findOrderQuery = "SELECT FROM orders WHERE orders_id = $1 OR title = $2"
export const findOrderIdQuery = "SELECT FROM orders WHERE orders_id = $1"
export const updateOrderQuery = "UPDATE orders SET title = $1, type = $2, description = $3, price = $4, image = $5, user_id = $6 WHERE orders_id = $7"
export const deleteOrderQuery = "DELETE FROM orders WHERE orders_id = $1"