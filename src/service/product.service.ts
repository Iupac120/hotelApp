
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

import { BadRequestError, NotFoundError, UnAuthorizedError } from "../errors/error.handler.js";
import { ProductInput } from "../models/product.model.js";
import { addProductQuery, checkUserQuery, deleteProductQuery, findAllProductQuery, findProductIdQuery, findProductQuery, updateProductQuery } from "../queries/product.queries.js";
import pool from "../utils/connect.js";

export async function createProduct (input:ProductInput,userId:string) {
    const adminExist = await pool.query(checkUserQuery,[userId])
    if(!adminExist.rows.length){
        throw new UnAuthorizedError("Only admit can create product")
    }
    console.log("one")
    const product = await pool.query(addProductQuery,[input.title,input.type,input.description, input.price,input.image,userId])
    console.log("one",product.rows[0])
    if(!product.rows.length){
        console.log("one")
        throw new BadRequestError("product not found")
    }
    console.log("one")
    return product.rows[0]
}


export async function findAllProduct (){
    const product = await pool.query(findAllProductQuery)
    if(!product.rows.length) throw new NotFoundError("Product not found")
    return product.rows
}

export async function findProduct (productId:number, productTitle:ProductInput){
    const product = await pool.query(findProductQuery,[productId,productTitle.title])
    if(!product.rows.length) throw new NotFoundError("Product not found")
    console.log("prodS", product.rows[0])
    return product.rows[0]
}

export async function updateProduct (userId: number, productId:number,input:ProductInput){
    const adminExist = await pool.query(checkUserQuery,[userId])
    if(!adminExist.rows.length) throw new UnAuthorizedError("Access denied")
    console.log("admi",adminExist.rows[0])
    const product = await pool.query(findProductIdQuery,[productId])
    if(!product.rows.length) throw new NotFoundError("Product not found")
    console.log("pro", product.rows[0])
    const updateProd = await pool.query(updateProductQuery,[
        input.title, input.type, input.description, input.price, input.image, userId, productId
    ])
    console.log("up", updateProd.rows[0])
    if(!updateProd.rows.length) throw new BadRequestError("Failed to update")
    return updateProd.rows
}

export async function deleteProduct (userId:number, productId:number){
    const adminExist = await pool.query(checkUserQuery,[userId])
    if(!adminExist.rows.length) throw new UnAuthorizedError("Access denied")
    const deleteProd =  await pool.query(deleteProductQuery,[productId])
    return deleteProd.rows[0]
}