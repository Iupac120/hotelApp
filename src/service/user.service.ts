//import {DocumentDefinition} from 'mongoose';
//import { omit } from 'lodash';
//import UserModel, {UserDocument, UserInput} from '../models/user.model';
// import { FilterQuery } from 'mongoose';
// import sessionModel, { SessionDocument } from '../models/session.model';

// export async function createUser(input: UserInput) {
//     try {
//         const user = await UserModel.create(input)
//         return omit(user,"password")
//     } catch (e:any) {
//         console.log(e)
//         throw new Error(e)
//     }
// }

// export async function validatePassword({email,password}:{email:string,password:string}) {
//     const user = await UserModel.findOne({email})
//     if(!user){
//         return false
//     }

//     const isValid = await user.comparePassword(password)
//     if(!isValid) return false;

//     return omit(user,"password")
// }

// export async function findUser (query:FilterQuery<UserDocument>){
//     return UserModel.findOne(query).lean()
// }
import pool from "../utils/connect";
import bcrypt from "bcrypt";
import { UserDocument, UserInput } from '../models/user.model';
import { checkEmail } from '../queries/auth.queries';
import config from "config";



// export async function createUserHandler (input:UserDocument,req:Request,res:Response){
//     const salt =  await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
//     const {username,email,password} = req.body
//     const emailExist = await pool.query(checkEmail,[email])
//     if((await emailExist).rows.length){
//         res.status(201).json({message:"Email already exists"})
//     }
//     const hashedPassword = await bcrypt.hash(password,salt)
//     const user = pool.query(addUser,[username, email, hashedPassword])
// }




export async function createUser(user: UserInput) {
    const emailExist = await pool.query(checkEmail,[user.email])
     if( emailExist.rows.length){
         //res.status(201).json({message:"Email already exists"})
         return false
     }
    const hashedPassword = await bcrypt.hash(user.password, config.get<number>('saltWorkFactor'));
    const creatnewUser = await  pool.query(
      'INSERT INTO users(email, name, password) VALUES($1, $2, $3) RETURNING id, email, name, created_at, updated_at',
      [user.email, user.username, hashedPassword]
    );
    return creatnewUser.rows[0]
  }


export async function comparePassword(user: UserDocument, candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, user.password);
  }





