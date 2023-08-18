
import { BadRequestError, NotFoundError, UnAuthorizedError } from "../errors/error.handler";
import { ProductInput } from "../models/product.model";
import { deleteOrderQuery, findAllOrderQuery, findOrderIdQuery, findOrderQuery, updateOrderQuery } from "../queries/order.queries";
import { addProductQuery, checkUserQuery, deleteProductQuery, findAllProductQuery, findProductIdQuery, findProductQuery, updateProductQuery } from "../queries/product.queries";
import pool from "../utils/connect";



export async function findAllOrder (){
    const orders = await pool.query(findAllOrderQuery)
    if(!orders.rows.length) return NotFoundError
    return orders.rows
}

export async function findOrder (orderId:number, orderTitle:ProductInput){
    const order = await pool.query(findOrderQuery,[orderId,orderTitle.title])
    if(!order.rows.length) return NotFoundError
    return order.rows[0]
}

export async function updateOrder (userId: number, orderId:number,input:ProductInput){
    const adminExist = await pool.query(checkUserQuery,[userId])
    if(!adminExist.rows.length) return UnAuthorizedError
    const order = await pool.query(findOrderIdQuery,[orderId])
    if(!order.rows.length) return NotFoundError
    const updateProd = await pool.query(updateOrderQuery,[
        input.title, input.type, input.description, input.price, input.image, input.user_id, orderId
    ])
    if(!updateProd.rows.length) return BadRequestError
    return updateProd.rows
}

export async function deleteOrder (userId:number, orderId:number){
    const adminExist = await pool.query(checkUserQuery,[userId])
    if(!adminExist.rows.length) return UnAuthorizedError
    const deleteOrder =  await pool.query(deleteOrderQuery,[orderId])
    if(!deleteOrder.rows.length) return BadRequestError
    return deleteOrder.rows[0]
}