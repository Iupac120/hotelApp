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
exports.deleteUserSessionHandler = exports.getUserSesionHandler = exports.createUserSesionHandler = void 0;
const user_service_1 = require("../service/user.service");
const session_service_1 = require("../service/session.service");
const session_service_2 = require("../service/session.service");
const jwt_utils_1 = require("../utils/jwt.utils");
const config_1 = __importDefault(require("config"));
function createUserSesionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //validate user's password
            const user = yield (0, user_service_1.validatePassword)(req.body);
            if (!user)
                return res.status(401).send("Invalid email or password");
            //create a session
            const userAgent = req.get("user-agent") || "";
            const session = yield (0, session_service_2.createSession)(user._id, userAgent); //user agent fro req body or from empty string
            //create an acess token
            console.log("seesion", session);
            console.log("user", user);
            console.log("agent", userAgent);
            const accessToken = (0, jwt_utils_1.signJwt)({ user, session: session._id }, {
                expiresIn: config_1.default.get("accessTokenTtl")
            });
            console.log("one");
            //create a refresh token
            const refreshToken = (0, jwt_utils_1.signJwt)({ user, session: session._id }, {
                expiresIn: config_1.default.get("refreshTokenTtl")
            });
            //store access and refresh token in cookie
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                domain: config_1.default.get("localhost"),
                path: config_1.default.get("path"),
                sameSite: "strict",
                secure: false,
                maxAge: 900000
            }); //15mins
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                domain: config_1.default.get("localhost"),
                path: config_1.default.get("path"),
                sameSite: "strict",
                secure: false,
                maxAge: 900000
            }); //15mins
            //return a refresh and acesss token
            return res.send({ accessToken, refreshToken });
        }
        catch (e) {
            console.log("error", e);
            res.status(500).json(e.message);
        }
    });
}
exports.createUserSesionHandler = createUserSesionHandler;
function getUserSesionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(res.locals.user.user._id);
        const userId = res.locals.user.user._id;
        console.log("user", userId);
        const sessions = yield (0, session_service_1.findSessions)({ user: userId, valid: true });
        return res.send(sessions);
    });
}
exports.getUserSesionHandler = getUserSesionHandler;
function deleteUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionId = res.locals.user.session;
        console.log("delete", sessionId);
        yield (0, session_service_1.updateSession)({ _id: sessionId }, { valid: false });
        return res.send({
            accessToken: null,
            refreshToken: null
        });
    });
}
exports.deleteUserSessionHandler = deleteUserSessionHandler;
