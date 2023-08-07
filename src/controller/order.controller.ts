import {Request,Response} from 'express'
import { CreateProductInput, DeleteProductInput, GetProductInput, UpdateProductInput } from '../schema/product.schema';
import { createProduct, deleteProduct, findAllProduct, findProduct, updateProduct } from "../service/product.service"
import { NotBeforeError } from 'jsonwebtoken';
import { NotFoundError } from '../errors/error.handler';

export async function createProductHandler (req:Request<{},{},CreateProductInput['body']>,res:Response){
    const userId = res.locals.user._id
    const body = req.body
    const product = await createProduct(body,userId)
    return res.status(product)
}

export async function getAllProductHandler (req:Request<GetProductInput['params']>,res:Response){
    const product = await findAllProduct()
    if(!product){
         return NotFoundError
    }
    return res.send(product)
}

export async function getProductHandler (req:Request<GetProductInput['params']>,res:Response){
    const productId = Number(req.params.productId)
    const body = req.body
    const product = await findProduct(productId,body)
    if(!product){
         return NotFoundError
    }
    return res.send(product)
}

export async function updateProductHandler (req:Request<GetProductInput['params']>,res:Response){
    const userId = Number(res.locals.user._id)
    const productId = Number(req.params.productId)
    const body = req.body
    const product = await updateProduct(userId,productId,body)
    if(!product){
         return NotFoundError
    }
    return res.send(product)
}

export async function deleteProductHandler(req:Request,res:Response){
    const userId = Number(res.locals.user._id)
    const productId = Number(req.params.productId)
    const product = await deleteProduct(userId,productId)
    if(!product) return NotFoundError
    return res.send(product)
}

