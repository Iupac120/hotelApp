export const checkUserQuery = "SELECT * FROM users WHERE user_id = $1"
export const addProductQuery = "INSERT INTO product (title, type, description, price, image, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"
export const findAllProductQuery = "SELECT * FROM product"
export const findProductQuery = "SELECT * FROM product WHERE product_id = $1"
export const findProductIdQuery = "SELECT * FROM product WHERE product_id = $1"
export const updateProductQuery = "UPDATE product SET title = $1, type = $2, description = $3, price = $4, image = $5, user_id = $6 WHERE product_id = $7 RETURNING *"
export const deleteProductQuery = "DELETE FROM product WHERE product_id = $1"