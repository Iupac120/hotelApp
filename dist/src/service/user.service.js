"use strict";
//import {DocumentDefinition} from 'mongoose';
//import { omit } from 'lodash';
//import UserModel, {UserDocument, UserInput} from '../models/user.model';
// import { FilterQuery } from 'mongoose';
// import sessionModel, { SessionDocument } from '../models/session.model';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendVerifyUserOtp = exports.verifyUserOtp = exports.createUserResetPassword = exports.createUserPassword = exports.deleteUserService = exports.updateUserService = exports.getSingleUserService = exports.getAllUsersService = exports.loginUser = exports.createUser = void 0;
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
const connect_1 = __importDefault(require("../utils/connect"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_queries_1 = require("../queries/auth.queries");
const config_1 = __importDefault(require("config"));
const crypto = __importStar(require("crypto"));
const user_queries_1 = require("../queries/user.queries");
const error_handler_1 = require("../errors/error.handler");
const mailer_utils_1 = require("../utils/mailer.utils");
const random_utils_1 = require("../utils/random.utils");
async function createUser(user) {
    const emailExist = await connect_1.default.query(auth_queries_1.checkEmail, [user.email]);
    if (emailExist.rows.length) {
        throw new error_handler_1.UnAuthorizedError("You already have an account, login with your email");
    }
    const salt = await bcrypt_1.default.genSalt(config_1.default.get('saltWorkFactor'));
    const hashedPassword = await bcrypt_1.default.hash(user.password, salt);
    const otp = await (0, random_utils_1.generateOtp)();
    const otpDate = Date.now() + 1800000;
    const otpTime = new Date(otpDate);
    const hashedOtp = await bcrypt_1.default.hash(otp, salt);
    const creatnewUser = await connect_1.default.query(auth_queries_1.addUser, [user.username, user.email, hashedPassword, hashedOtp, otpTime]);
    //E-mail message
    const message = `
  <h2>Hello ${user.username}</h2>
  <p>Please use the otp below to verify your account</p>
  <p>This is your verification code ${otp}.</p>
  <p>This code will expire in 30 minutes.</p>

  <p>Regards...</p>
  `;
    const subject = `User Verification Code`;
    const send_to = user.email;
    const sent_from = config_1.default.get("emailedFrom");
    const replyTo = `Yes`;
    await (0, mailer_utils_1.sendEmail)(subject, message, send_to, sent_from, replyTo);
    return creatnewUser.rows[0];
}
exports.createUser = createUser;
//login user service
async function loginUser(input) {
    const emailExist = await connect_1.default.query(auth_queries_1.checkEmail, [input.email]);
    if (emailExist.rows.length === 0) {
        return false;
    }
    const isVerified = emailExist.rows[0].is_verified;
    if (!isVerified) {
        throw new error_handler_1.BadRequestError("You are not verified");
    }
    let user = await bcrypt_1.default.compare(input.password, emailExist.rows[0].password);
    if (!user) {
        throw new error_handler_1.UnAuthorizedError("Sorry, you password is incorrect");
    }
    return emailExist.rows[0];
}
exports.loginUser = loginUser;
async function getAllUsersService() {
    const users = await connect_1.default.query(user_queries_1.getUsers);
    return users.rows;
}
exports.getAllUsersService = getAllUsersService;
async function getSingleUserService(userId) {
    const user = await connect_1.default.query(user_queries_1.getUserById, [userId]);
    return user.rows[0];
}
exports.getSingleUserService = getSingleUserService;
async function updateUserService(input, userId) {
    const user = await connect_1.default.query(user_queries_1.updateUserById, [input.first_name, input.last_name, input.photo, input.phone, input.gender, input.city, input.address, input.country_of_birth, input.date_of_birth, userId]);
    return user.rows[0];
}
exports.updateUserService = updateUserService;
async function deleteUserService(userId) {
    const user = await connect_1.default.query(user_queries_1.deleteUserById, [userId]);
    return user.rows[0];
}
exports.deleteUserService = deleteUserService;
//create reset token
async function createUserPassword(input) {
    const user = await connect_1.default.query(user_queries_1.getUserByEmail, [input.email]);
    if (!user.rows.length) {
        throw new error_handler_1.NotFoundError("Email does not exist, sign up to register");
    }
    //delete token if it exists in db
    const tokenExist = user.rows[0].token;
    if (tokenExist) {
        await connect_1.default.query(user_queries_1.updateTokenByQuery, [input.email]);
    }
    const token = crypto.randomBytes(32).toString("hex") + user.rows[0].user_id;
    //hash secret before saving in db
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const tokenDate = Date.now() + 1800000; //15 minutes
    const tokenTime = new Date(tokenDate);
    const userId = user.rows[0].user_id;
    const username = user.rows[0].username;
    await connect_1.default.query(user_queries_1.updateUserToken, [hashedToken, tokenTime, userId]);
    const link = `${config_1.default.get("url")}/${userId}/token=${token}`; //
    //E-mail message
    const message = `
    <h2>Hello ${username}</h2>
    <p>Please use the url below to reset you password</p>
    <p>This reset link is valid for <span>30</span> minutes</p>
    <a href="${link}" clicktracking=off>${link}</a>

    <p>Regards...</p>
  `;
    const subject = `Password Reset Request`;
    const send_to = user.rows[0].email;
    const sent_from = config_1.default.get("emailedFrom");
    const replyTo = `Yes`;
    await (0, mailer_utils_1.sendEmail)(subject, message, send_to, sent_from, replyTo);
    return user.rows[0].email;
}
exports.createUserPassword = createUserPassword;
async function createUserResetPassword(input, userId, token) {
    const user = await connect_1.default.query(user_queries_1.getUserById, [userId]);
    if (!user.rows.length) {
        throw new error_handler_1.NotFoundError("Email does not exist, signup to register");
    }
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const userExist = user.rows[0];
    if (userExist.token !== hashedToken)
        throw new error_handler_1.ForBiddenError("Incorrect request link");
    if (userExist.token_expires_at < Date.now()) {
        throw new error_handler_1.ForBiddenError("Token has expired, request for a new token");
    }
    const salt = await bcrypt_1.default.genSalt(config_1.default.get("saltWorkFactor"));
    const newPassword = await bcrypt_1.default.hash(input.password, salt);
    const updatePassword = await connect_1.default.query(user_queries_1.updateUserPassword, [newPassword, userExist.email]);
    return user.rows[0].email;
}
exports.createUserResetPassword = createUserResetPassword;
async function verifyUserOtp(input, otpEmail) {
    const userExist = await connect_1.default.query(user_queries_1.getUserByEmail, [otpEmail]);
    if (!userExist.rows.length) {
        throw new error_handler_1.NotFoundError("Email does not exist");
    }
    const user = userExist.rows[0];
    if (!user.token)
        throw new error_handler_1.ForBiddenError("Token not found");
    if (Date.now() > user.token_expires_at)
        throw new error_handler_1.BadRequestError("Token has expired");
    const isValid = await bcrypt_1.default.compare(input, user.token);
    if (!isValid)
        throw new error_handler_1.BadRequestError("Invalid token");
    const verifyUser = await connect_1.default.query(user_queries_1.updateUserIsVerify, [otpEmail]);
    return verifyUser.rows[0];
}
exports.verifyUserOtp = verifyUserOtp;
async function resendVerifyUserOtp(input) {
    const userExist = await connect_1.default.query(user_queries_1.getUserByEmail, [input]);
    if (!userExist.rows.length)
        throw new error_handler_1.NotFoundError("Email not found");
    const isVerified = userExist.rows[0].is_verified;
    if (isVerified)
        throw new error_handler_1.BadRequestError("You have been verified, login with your email");
    const deleteOtp = await connect_1.default.query(user_queries_1.updateTokenByQuery, [input]);
    if (deleteOtp) {
        const salt = await bcrypt_1.default.genSalt(config_1.default.get('saltWorkFactor'));
        const otp = await (0, random_utils_1.generateOtp)();
        const otpDate = Date.now() + 1800000;
        const otpTime = new Date(otpDate);
        const hashedOtp = await bcrypt_1.default.hash(otp, salt);
        const updateOtp = await connect_1.default.query(user_queries_1.updateUserResetToken, [hashedOtp, otpTime, input]);
        //E-mail message
        const message = `
    <h2>Hello ${userExist.rows[0].username}</h2>
    <p>Please use the otp below to verify your account</p>
    <p>This is your verification code ${otp}.</p>
    <p>This code will expire in ${otpTime} minutes.</p>
  
    <p>Regards...</p>
    `;
        const subject = `User Verification Code`;
        const send_to = userExist.rows[0].email;
        const sent_from = config_1.default.get("emailedFrom");
        const replyTo = `Yes`;
        await (0, mailer_utils_1.sendEmail)(subject, message, send_to, sent_from, replyTo);
    }
    return userExist.rows[0];
}
exports.resendVerifyUserOtp = resendVerifyUserOtp;
