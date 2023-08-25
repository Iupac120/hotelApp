import {number, object,string,TypeOf, array} from 'zod';

export const createRoomNumberSchema =  object({
    body: object({
        room_number:number({required_error:"Room number is required"}),
        unavailable_date:array(string({required_error:"Date is required"}))
    })
})

export const createRoomSchema =  object({
    body: object({
        title:string({required_error:"Title is required"}),
        price:number({required_error:"Price is required"}),
        max_people:number({required_error:"Max number of occupant is required"}),
        description:string({required_error:"Description is required"})    
    })
})
//request params
export const getHotelSchema = object({
        params:object({
            hotelId: string({required_error:"hotel id is required"})
        })
})
//what type of req body should the route expect
export type createRoomNumberInput = TypeOf<typeof createRoomNumberSchema>; 
export type createRoomInput = TypeOf<typeof createRoomSchema>; 
export type getHotelInput = TypeOf<typeof getHotelSchema>; 