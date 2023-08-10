
import { BadRequestError, NotFoundError, UnAuthorizedError } from "../errors/error.handler";
import { ProductInput } from "../models/product.model";
import { addProductQuery, checkUserQuery, deleteProductQuery, findAllProductQuery, findProductIdQuery, findProductQuery, updateProductQuery } from "../queries/product.queries";
import pool from "../utils/connect";



export async function findAllOrder (){
    const product = await pool.query(findAllProductQuery)
    if(!product.rows.length) return NotFoundError
    return product.rows
}

export async function findOrder (productId:number, productTitle:ProductInput){
    const product = await pool.query(findProductQuery,[productId,productTitle.title])
    if(!product.rows.length) return NotFoundError
    return product.rows[0]
}

export async function updateOrder (userId: number, productId:number,input:ProductInput){
    const adminExist = await pool.query(checkUserQuery,[userId])
    if(!adminExist.rows.length) return UnAuthorizedError
    const product = await pool.query(findProductIdQuery,[productId])
    if(!product.rows.length) return NotFoundError
    const updateProd = await pool.query(updateProductQuery,[
        input.title, input.type, input.description, input.price, input.image, input.user_id, productId
    ])
    if(!updateProd.rows.length) return BadRequestError
    return updateProd.rows
}

export async function deleteOrder (userId:number, productId:number){
    const adminExist = await pool.query(checkUserQuery,[userId])
    if(!adminExist.rows.length) return UnAuthorizedError
    const deleteProd =  await pool.query(deleteProductQuery,[productId])
    if(!deleteProd.rows.length) return BadRequestError
    return deleteProd.rows[0]
}