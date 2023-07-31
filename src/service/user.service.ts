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
import { addUser, checkEmail } from '../queries/auth.queries';
import config from "config";
import * as crypto from "crypto"

import { QueryResult } from "pg";
import { addHotel, checkName, deleteHotelById, getHotelById, getHotels, updateHotelById } from "../queries/hotel.queries";
import { HotelDocument } from "../models/hotel.model";
import { deleteUserById, getUserByEmail, getUserById, getUsers, updateUserById } from "../queries/user.queries";
import { NotFoundError } from "../errors/error.handler";
import jwt from "jsonwebtoken"
import { sendEmail } from "../utils/mailer.utils";


export async function createUser(user: UserInput) {
    const emailExist = await pool.query(checkEmail,[user.email])
    console.log("emailhere", emailExist.rows.length)
     if( emailExist.rows.length){
         //res.status(201).json({message:"Email already exists"})
         return false
     }
    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'))
    const hashedPassword = await bcrypt.hash(user.password,salt );
    const creatnewUser = await  pool.query(addUser,
      [user.username, user.email, hashedPassword]
    );
    await sendEmail()
    return creatnewUser.rows[0]
  }

export async function loginUser (input:UserDocument){
  const emailExist = await pool.query(checkEmail,[input.email])
  if(emailExist.rows.length === 0){
    return false
  }
  let user:Boolean = await bcrypt.compare(input.password, emailExist.rows[0].password)
  
  if(!user){
    return false
  }
  return emailExist.rows[0]
}


export async function getAllUsersService(){
    const users =  await pool.query(getUsers)
    return users.rows
  } 

export async function getSingleUserService(userId:number){
    const user:QueryResult =  await pool.query(getUserById, [userId])
    return user.rows[0]
  } 

export async function updateUserService(input:UserDocument,userId:number){
    const user =  await pool.query(updateUserById, [input.first_name, input.last_name, input.photo, input.phone, input.gender, input.city, input.address, input.country_of_birth, input.date_of_birth, userId])
    return user.rows[0]
  } 

export async function deleteUserService(userId:number){
    const user =  await pool.query(deleteUserById, [userId])
    return user.rows[0]
  } 


export async function getUserPassword(){}

export async function createUserPassword(input:UserDocument){
  const user  =  await pool.query(getUserByEmail,[input.email])
  if(!user.rows.length){
    return NotFoundError
  }
  const secret = crypto.randomBytes(32).toString("hex") + user.rows[0].user_id
  const userId = user.rows[0].user_id
  const payload = {
    email: user.rows[0].email,
    id:userId
  }

  const token = jwt.sign(payload,secret,{expiresIn:config.get("accessTokenTtl")})
  const link = `${config.get("url")}/${userId}/token=${token}` //
  //E-mail message
  const message = `
    <h2>Hello ${user.rows[0].first_name}</h2>
    <p>Please use the url below to reset you password</p>
    <p>This reset link is valid for <span>30</span> minutes</p>
    <a href="${link}" clicktracking=off>${link}</a>

    <p>Regards...</p>
  `
  const subject = `Password Reset Request`
  const send_to = user.rows[0].email
  const sent_from = config.get<string>("emailedFrom")
  const replyTo=`Yes`
  
  sendEmail(subject, message, send_to,sent_from,replyTo)

}


export async function getUserResetPassword(){}
export async function createUserResetPassword(userParams: number | string){
  const user = await pool.query()
  // if(typeof(userParams) === "number"){
  //   if(userParams.user_id === )
  // }
}


