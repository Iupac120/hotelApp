import mongoose from 'mongoose';
import { UserDocument } from './user.model';
//import {customAlphabet} from "nanoid"

//const nanoid =  customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789",10)

export interface ProductInput{
    user:string
    title:string
    description:string;
    price:number;
    image:string;
}
export interface ProductDocument extends ProductInput, mongoose.Document {
    createdAt:Date;
    updatedAt:Date
} 

const productSchema =  new mongoose.Schema({
    productId:{
        type:String,
        required:true,
        unique:true,
  //      default:() => `product_${nanoid()}`
    },
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    title:{type:String, required: true},
    description:{type:String},
    price:{type:String, required: true},
    image:{type:String},
    
},{
    timestamps:true
})

const productModel =  mongoose.model("Product",productSchema)

export default productModel;