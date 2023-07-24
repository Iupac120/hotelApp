import {number, object,string,TypeOf} from 'zod';

export const createHotelSchema =  object({
    body: object({
        name:string({required_error:"Name is required"}),
        type:string({required_error:"Type is required"}),
        address:string({required_error:"Address is required"}),
        distance:string({required_error:"Distance is required"}),
        photo:string({required_error:"Photo is required"}),
        description:string({required_error:"Description is required"}),
        rating:number({required_error:'Rating is required'}).min(0,"The minimum is 0").max(5,"The maximum is 5"),
        rooms:string({required_error:"Room is required"}),
        cheapest_price:number({required_error:"Cheapest_price is required"}),
        
    })
})
//request params
export const getHotelSchema = object({
        params:object({
            hotelId: number({required_error:"Product id is required"})
        })
})
//what type of req body should the route expect
export type createHotelInput = TypeOf<typeof createHotelSchema>; 
export type getHotelInput = TypeOf<typeof getHotelSchema>; 