import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import e from 'express';

//resolving Omit
export interface UserInput {
    email:string;
    name:string;
    password:string;
}
//typescript definition of user model
export interface UserDocument extends UserInput, mongoose.Document {
    createdAt:Date;
    updatedAt:Date;
    comparePassword(candiadtePasword:string):Promise<Boolean>
}


const userSchema =  new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    password:{type:String,required:true}
},{
    timestamps:true
})

userSchema.pre("save", async function (next){
    let user = this as UserDocument
    if(!user.isModified("password")){
        return next()
    }
    const salt =  await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
    const hash  = await bcrypt.hashSync(user.password,salt);
    user.password = hash;
    return next()
})

userSchema.methods.comparePassword = async function (candiadtePasword:string):Promise<boolean>{
    const user = this as UserDocument
    return bcrypt.compare(candiadtePasword,user.password).catch((e)=>e.false)
}

const UserModel =  mongoose.model<UserDocument>("User",userSchema)

export default UserModel;