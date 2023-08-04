import {Request,Response} from 'express'
import { CreateProductInput, DeleteProductInput, GetProductInput, UpdateProductInput } from '../schema/product.schema';
// import { createProduct, deleteProduct, findAndUpdateProduct, findProduct } from '../service/product.service';



// export async function createProductHandler (req:Request<{},{},CreateProductInput['body']>,res:Response){
// const userId = res.locals.user._id
// const body = req.body
// const product =  await createProduct({...body,user:userId})
// return res.send(product)
// }
// export async function updateProductHandler (req:Request<UpdateProductInput['params']>,res:Response){
//     const userId =  res.locals.user._id
//     const update = req.body
//     const productId = req.params.productId
//     let product = await findProduct({productId})
//     if(!product){
//         res.sendStatus(404)
//     }
//     if(String(product.user) !== userId){
//         res.sendStatus(403)
//     }
//     const updatedProduct = await findAndUpdateProduct({productId},update,{
//         new: true
//     })
//     return res.send(updatedProduct)
// }
// export async function getProductHandler (req:Request<GetProductInput['params']>,res:Response){
//     const productId = req.params.productId
//     const product = await findProduct({productId})
//     if(!product){
//         return res.sendStatus(404)
//     }
//     return res.send(product)
// }
// export async function deleteProductHandler (req:Request<DeleteProductInput['params']>,res:Response){
//     const userId =  res.locals.user._id
//     const productId = req.params.productId
//     const product = await findProduct({productId})
//     if(!product){
//         res.sendStatus(404)
//     }
//     if(String(product.user) !== userId){//cast product.user to a string because userid a string while product.user a mongoose objectid
//         res.sendStatus(403)
//     }
//     await deleteProduct({productId})
//     return res.sendStatus(200) 
// }

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

