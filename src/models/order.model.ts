import { CartItem } from "./session.model.js"

export interface OrderDocument {
    user_id:number
    session_id:CartItem
    payment_Method: string
    expected_time:Date
    delivery_Address: string
    payment_id:string
    payment_status:boolean
    payment_time:Date,
    payment_email:string
    is_Delivered:boolean
    delivered_time:Date
    total_price: number
    created_at:Date
}

