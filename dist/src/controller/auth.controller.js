"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResetOtpHandler = exports.verifyUserOtpHandler = exports.getResetPasswordHandler = exports.createResetPasswordHandler = exports.createPasswordHandler = exports.getPasswordHandler = exports.logout = exports.loginUserHandler = exports.createUserHandler = void 0;
const user_service_js_1 = require("../service/user.service.js");
const config_1 = __importDefault(require("config"));
const jwt_utils_js_1 = require("../utils/jwt.utils.js");
async function createUserHandler(req, res) {
    const user = await (0, user_service_js_1.createUser)(req.body); //call service
    //return res.send(omit(user,"password"));//omit the user to json object
    return res.status(201).json(`Sign up otp has been sent to your email:${user.email}`);
}
exports.createUserHandler = createUserHandler;
//login controller
async function loginUserHandler(req, res, next) {
    const user = await (0, user_service_js_1.loginUser)(req.body);
    const userAgent = req.get("user-agent") || "";
    //create an acess token
    console.log("user", user);
    console.log("agent", userAgent);
    const accessToken = (0, jwt_utils_js_1.signJwt)({ id: user.user_id, isAdmin: user.is_admin, userAgent }, {
        expiresIn: config_1.default.get("accessTokenTtl")
    });
    console.log("one");
    //create a refresh token
    const refreshToken = (0, jwt_utils_js_1.signJwt)({ id: user.user_id, isAdmin: user.is_admin, userAgent }, {
        expiresIn: config_1.default.get("refreshTokenTtl")
    });
    console.log("two");
    //store access and refresh token in cookie
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        //domain:config.get("localhost"),
        path: config_1.default.get("path"),
        sameSite: "strict",
        secure: false,
        maxAge: 900000
    }); //15mins
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        //domain:config.get("localhost"),
        path: config_1.default.get("path"),
        sameSite: "strict",
        secure: false,
        maxAge: 900000
    }); //15mins
    //return a refresh and acesss token
    return res.status(201).json({ accessToken, refreshToken });
    //return res.status(201).json(user)
}
exports.loginUserHandler = loginUserHandler;
async function logout(req, res) {
    res.cookie("accessToken", "", {
        path: config_1.default.get("path"),
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: false //production is true
    });
    return res.status(200).json({ message: "You have succesfully logged out" });
}
exports.logout = logout;
async function getPasswordHandler(req, res) {
    return res.status(201).json("render forgot password page");
}
exports.getPasswordHandler = getPasswordHandler;
async function createPasswordHandler(req, res) {
    await (0, user_service_js_1.createUserPassword)(req.body);
    return res.status(201).json({ message: `Password reset link send to your ${req.body.email}` });
}
exports.createPasswordHandler = createPasswordHandler;
async function createResetPasswordHandler(req, res) {
    const userId = Number(req.params.user_id);
    const token = req.params.token;
    await (0, user_service_js_1.createUserResetPassword)(req.body, userId, token);
    return res.status(201).json({ message: "Password reset" });
}
exports.createResetPasswordHandler = createResetPasswordHandler;
//
async function getResetPasswordHandler(req, res) {
    return res.status(201).json("render reset password page");
}
exports.getResetPasswordHandler = getResetPasswordHandler;
async function verifyUserOtpHandler(req, res) {
    const input = req.body.otp;
    const otpEmail = req.body.email;
    await (0, user_service_js_1.verifyUserOtp)(input, otpEmail);
    return res.status(201).json({ message: "Email verification success" });
}
exports.verifyUserOtpHandler = verifyUserOtpHandler;
async function createResetOtpHandler(req, res) {
    const input = req.body.email;
    const user = await (0, user_service_js_1.resendVerifyUserOtp)(input);
    res.status(201).json({ message: `A new otp has been sent to your email:${user.email}` });
}
exports.createResetOtpHandler = createResetOtpHandler;
