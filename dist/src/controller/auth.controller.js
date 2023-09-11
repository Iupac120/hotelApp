"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResetOtpHandler = exports.verifyUserOtpHandler = exports.getResetPasswordHandler = exports.createResetPasswordHandler = exports.createPasswordHandler = exports.getPasswordHandler = exports.logout = exports.loginUserHandler = exports.createUserHandler = void 0;
const user_service_1 = require("../service/user.service");
const config_1 = __importDefault(require("config"));
const jwt_utils_1 = require("../utils/jwt.utils");
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, user_service_1.createUser)(req.body); //call service
        //return res.send(omit(user,"password"));//omit the user to json object
        return res.status(201).json(`Sign up otp has been sent to your email:${user.email}`);
    });
}
exports.createUserHandler = createUserHandler;
//login controller
function loginUserHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, user_service_1.loginUser)(req.body);
        const userAgent = req.get("user-agent") || "";
        //create an acess token
        console.log("user", user);
        console.log("agent", userAgent);
        const accessToken = (0, jwt_utils_1.signJwt)({ id: user.user_id, isAdmin: user.is_admin, userAgent }, {
            expiresIn: config_1.default.get("accessTokenTtl")
        });
        console.log("one");
        //create a refresh token
        const refreshToken = (0, jwt_utils_1.signJwt)({ id: user.user_id, isAdmin: user.is_admin, userAgent }, {
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
    });
}
exports.loginUserHandler = loginUserHandler;
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.cookie("accessToken", "", {
            path: config_1.default.get("path"),
            httpOnly: true,
            expires: new Date(0),
            sameSite: "none",
            secure: false //production is true
        });
        return res.status(200).json({ message: "You have succesfully logged out" });
    });
}
exports.logout = logout;
function getPasswordHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.status(201).json("render forgot password page");
    });
}
exports.getPasswordHandler = getPasswordHandler;
function createPasswordHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, user_service_1.createUserPassword)(req.body);
        return res.status(201).json({ message: `Password reset link send to your ${req.body.email}` });
    });
}
exports.createPasswordHandler = createPasswordHandler;
function createResetPasswordHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = Number(req.params.user_id);
        const token = req.params.token;
        yield (0, user_service_1.createUserResetPassword)(req.body, userId, token);
        return res.status(201).json({ message: "Password reset" });
    });
}
exports.createResetPasswordHandler = createResetPasswordHandler;
//
function getResetPasswordHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.status(201).json("render reset password page");
    });
}
exports.getResetPasswordHandler = getResetPasswordHandler;
function verifyUserOtpHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const input = req.body.otp;
        const otpEmail = req.body.email;
        yield (0, user_service_1.verifyUserOtp)(input, otpEmail);
        return res.status(201).json({ message: "Email verification success" });
    });
}
exports.verifyUserOtpHandler = verifyUserOtpHandler;
function createResetOtpHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const input = req.body.email;
        const user = yield (0, user_service_1.resendVerifyUserOtp)(input);
        res.status(201).json({ message: `A new otp has been sent to your email:${user.email}` });
    });
}
exports.createResetOtpHandler = createResetOtpHandler;
