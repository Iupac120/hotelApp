export interface OrderInput {
    user_id:number
    product_id:number
    paymentMethod: string
    isPaid: string
    isDelivered:number

}

export interface OrderDocument extends OrderInput { 
    created_at: Date
}
