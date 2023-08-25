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
import {  deleteUserById, getOtpByEmail, getUserByEmail, getUserById, getUsers, updateTokenByQuery, updateUserById, updateUserIsVerify, updateUserPassword, updateUserResetToken, updateUserToken } from "../queries/user.queries";
import { BadRequestError, ForBiddenError, NotFoundError, UnAuthorizedError } from "../errors/error.handler";
import jwt from "jsonwebtoken"
import { sendEmail } from "../utils/mailer.utils";
import { generateOtp } from "../utils/random.utils";


export async function createUser(user: UserInput) {
    const emailExist = await pool.query(checkEmail,[user.email])
     if( emailExist.rows.length){
         throw new UnAuthorizedError ("You already have an account, login with your email")
     }
    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'))
    const hashedPassword = await bcrypt.hash(user.password,salt );
    const otp = await generateOtp()
    const otpDate = Date.now() + 1800000
    const otpTime = new Date(otpDate)
    const hashedOtp = await bcrypt.hash(otp,salt)
    const creatnewUser = await  pool.query(addUser,
      [user.username, user.email, hashedPassword,hashedOtp,otpTime]
    );
    //E-mail message
  const message = `
  <h2>Hello ${user.username}</h2>
  <p>Please use the otp below to verify your account</p>
  <p>This is your verification code ${otp}.</p>
  <p>This code will expire in 30 minutes.</p>

  <p>Regards...</p>
  `
  const subject = `User Verification Code`
  const send_to = user.email
  const sent_from = config.get<string>("emailedFrom")
  const replyTo=`Yes`
  await sendEmail(subject, message, send_to,sent_from,replyTo)
    return creatnewUser.rows[0]
  }

  //login user service
export async function loginUser (input:UserDocument){
  const emailExist = await pool.query(checkEmail,[input.email])
  if(emailExist.rows.length === 0){
    return false
  }
  const isVerified = emailExist.rows[0].is_verified
  if(!isVerified){
    throw new BadRequestError("You are not verified")
  }
  let user:Boolean = await bcrypt.compare(input.password, emailExist.rows[0].password)
  if(!user){
    throw new UnAuthorizedError("Sorry, you password is incorrect")
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


//create reset token
export async function createUserPassword(input:UserDocument){
  const user  =  await pool.query(getUserByEmail,[input.email])
  if(!user.rows.length){
    throw new NotFoundError("Email does not exist, sign up to register")
  }
  //delete token if it exists in db
  const tokenExist = user.rows[0].token
  if(tokenExist){
    await pool.query(updateTokenByQuery,[input.email])
  }
  const token = crypto.randomBytes(32).toString("hex") + user.rows[0].user_id
  //hash secret before saving in db
  const hashedToken  = crypto.createHash("sha256").update(token).digest("hex")
  const tokenDate =  Date.now() + 1800000 //15 minutes
  const tokenTime = new Date(tokenDate)
  const userId = user.rows[0].user_id
  const username = user.rows[0].username
  await pool.query(updateUserToken,[hashedToken,tokenTime,userId])
  const link = `${config.get("url")}/${userId}/token=${token}` //
  //E-mail message
  const message = `
    <h2>Hello ${username}</h2>
    <p>Please use the url below to reset you password</p>
    <p>This reset link is valid for <span>30</span> minutes</p>
    <a href="${link}" clicktracking=off>${link}</a>

    <p>Regards...</p>
  `
  const subject = `Password Reset Request`
  const send_to = user.rows[0].email
  const sent_from = config.get<string>("emailedFrom")
  const replyTo=`Yes`
  await sendEmail(subject, message, send_to,sent_from,replyTo)
  return user.rows[0].email
}


export async function createUserResetPassword(input:UserInput,userId:number,token:string){
    const user = await pool.query(getUserById,[userId])
    if (!user.rows.length){
        throw new NotFoundError("Email does not exist, signup to register")
    }
    const hashedToken  = crypto.createHash("sha256").update(token).digest("hex")
    const userExist =  user.rows[0]
    if(userExist.token !== hashedToken) throw new ForBiddenError("Incorrect request link")
    if(userExist.token_expires_at < Date.now()){
      throw new ForBiddenError("Token has expired, request for a new token")
    }
    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"))
    const newPassword =  await bcrypt.hash(input.password,salt)
    const updatePassword = await pool.query(updateUserPassword,[newPassword,userExist.email])
    return user.rows[0].email
}



export async function verifyUserOtp (input:string,otpEmail:string){
  const userExist = await pool.query(getUserByEmail,[otpEmail])
  if(!userExist.rows.length){
    throw new NotFoundError("Email does not exist")
  }
  const user = userExist.rows[0]
  if(!user.token) throw new ForBiddenError("Token not found")
  if(Date.now() > user.token_expires_at) throw new BadRequestError("Token has expired")
  const isValid =  await bcrypt.compare(input,user.token)
  if(!isValid) throw new BadRequestError("Invalid token")
  const verifyUser = await pool.query(updateUserIsVerify,[otpEmail])
  return verifyUser.rows[0]
}

export async function resendVerifyUserOtp(input:string){
 const userExist = await pool.query(getUserByEmail,[input])
 if(!userExist.rows.length) throw new NotFoundError("Email not found")
 const isVerified = userExist.rows[0].is_verified
if (isVerified) throw new BadRequestError("You have been verified, login with your email")
const deleteOtp = await pool.query(updateTokenByQuery,[input])
if(deleteOtp){
const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'))
const otp = await generateOtp()
const otpDate = Date.now() + 1800000
const otpTime = new Date(otpDate)
const hashedOtp =  await bcrypt.hash(otp,salt)
const updateOtp =  await pool.query(updateUserResetToken,[hashedOtp, otpTime, input])
    //E-mail message
const message = `
    <h2>Hello ${userExist.rows[0].username}</h2>
    <p>Please use the otp below to verify your account</p>
    <p>This is your verification code ${otp}.</p>
    <p>This code will expire in ${otpTime} minutes.</p>
  
    <p>Regards...</p>
    `
  const subject = `User Verification Code`
  const send_to = userExist.rows[0].email
  const sent_from = config.get<string>("emailedFrom")
  const replyTo=`Yes`
  await sendEmail(subject, message, send_to,sent_from,replyTo)
}
  return userExist.rows[0]
}