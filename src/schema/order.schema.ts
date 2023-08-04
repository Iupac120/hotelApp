import {object,number,string,TypeOf} from "zod"

const payload = {
    body: object({
        user_id:number({required_error:"user id is required"}),
        product_id:number({required_error:"product id is required"}),
        paymentMthod:string({required_error:"Payment method is required"}),
        isPaid:string({required_error:"Payment status is required"}).min(6,"Descrition should be at least 6 character long"),
    })
}

const params = {
    params:object({
        productId: string({required_error:"Product id is required"})
    })
}

export const createProductSchema = object({
    ...payload
})
export const updateProductSchema = object({
    ...payload,
    ...params
})
export const getProductSchema = object({
    ...params
})
export const deleteProductSchema = object({
    ...params
})

export type CreateProductInput = TypeOf <typeof createProductSchema>
export type UpdateProductInput = TypeOf <typeof updateProductSchema>
export type GetProductInput = TypeOf <typeof getProductSchema>
export type DeleteProductInput = TypeOf <typeof deleteProductSchema>