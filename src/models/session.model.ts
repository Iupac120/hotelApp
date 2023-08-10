// import mongoose from 'mongoose';
// import { UserDocument } from './user.model';

// export interface SessionDocument extends mongoose.Document {
//     user:string;
//     valid:Boolean;
//     userAgent:string;
//     createdAt:Date;
//     updatedAt:Date
// } 

// const sessionSchema =  new mongoose.Schema({
//     user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
//     valid:{type:Boolean, default: true},
//     userAgent:{type:String} // User browser
// },{
//     timestamps:true
// })

// const sessionModel =  mongoose.model<SessionDocument>("Session",sessionSchema)

// export default sessionModel;

// export interface SessionDocument {
//     user_id:number
//     valid:Date
//     userAgent:string
//     product_id:number
//     total_price:number
//     created_at:Date
// }



export interface CartItem {
  item_id: number;
  item_name: string;
  quantity: number;
  price: number; // Assuming there is a price field for each item
}

export interface Cart {
  [itemId: number]: CartItem;
}

export interface CartTotal  {
  totalQuantity: number;
  totalPrice: number;
}



