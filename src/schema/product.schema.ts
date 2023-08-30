import {object,number,string,TypeOf, array} from "zod"

const payload = {
    body: object({
        //user_id:number({required_error:"user_id is required"}),
        title:string({required_error:"Title is required"}),
        type:string({required_error:"Type is required"}),
        description:string({required_error:"Description is required"}).min(6,"Descrition should be at least 6 character long"),
        price:number({required_error:"Price is required"}),
        image:array(string({required_error:"Image is required"}))
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

export type CreateProductInput = Omit<TypeOf <typeof createProductSchema>,"body.user_id">
export type UpdateProductInput = TypeOf <typeof updateProductSchema>
export type GetProductInput = TypeOf <typeof getProductSchema>
export type DeleteProductInput = TypeOf <typeof deleteProductSchema>