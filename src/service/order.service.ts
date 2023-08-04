
// import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose"
// import productModel, { ProductDocument,ProductInput } from "../models/product.model"

// export async function createProduct (input:ProductInput){
//     const product = await productModel.create(input)
//     return product
// }
// export async function findProduct (
//     query:FilterQuery<ProductDocument>,
//     options:QueryOptions = {lean: true}
//     ){
//     return productModel.findOne(query,{},options)
// }
// export async function findAndUpdateProduct (
//     query:FilterQuery<ProductDocument>,
//     update:UpdateQuery<ProductDocument>,
//     options:QueryOptions
//     ){
//         return productModel.findOneAndUpdate(query,update,options)
//     }
// export async function deleteProduct (query:FilterQuery<ProductDocument>){
//     return productModel.deleteOne(query)
// }

import { BadRequestError, NotFoundError, UnAuthorizedError } from "../errors/error.handler";
import { ProductInput } from "../models/product.model";
import { addProductQuery, checkUserQuery, deleteProductQuery, findAllProductQuery, findProductIdQuery, findProductQuery, updateProductQuery } from "../queries/product.queries";
import pool from "../utils/connect";

export async function createProduct (input:ProductInput,userId:number) {
    const adminExist = await pool.query(checkUserQuery,[userId])
    if(!adminExist.rows.length){
        return UnAuthorizedError
    }
    const product = await pool.query(addProductQuery,[input.title,input.type,input.description, input.price,input.image,userId])
    if(!product.rows.length){
        return BadRequestError
    }
    return product.rows[0]
}


export async function findAllProduct (){
    const product = await pool.query(findAllProductQuery)
    if(!product.rows.length) return NotFoundError
    return product.rows
}

export async function findProduct (productId:number, productTitle:ProductInput){
    const product = await pool.query(findProductQuery,[productId,productTitle.title])
    if(!product.rows.length) return NotFoundError
    return product.rows[0]
}

export async function updateProduct (userId: number, productId:number,input:ProductInput){
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

export async function deleteProduct (userId:number, productId:number){
    const adminExist = await pool.query(checkUserQuery,[userId])
    if(!adminExist.rows.length) return UnAuthorizedError
    const deleteProd =  await pool.query(deleteProductQuery,[productId])
    if(!deleteProd.rows.length) return BadRequestError
    return deleteProd.rows[0]
}