"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifyUser = exports.deserializeUser = void 0;
const lodash_1 = __importDefault(require("lodash")); //to get a property that your not certain it exists
const { get } = lodash_1.default; //to get a property that your not certain it exists
const jwt_utils_js_1 = require("../utils/jwt.utils.js");
const config_1 = __importDefault(require("config"));
const session_service_js_1 = require("../service/session.service.js");
const authentic_error_js_1 = require("../errors/authentic.error.js");
async function deserializeUser(req, res, next) {
    const accessToken = get(req, "cookies.accessToken") || get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    const refreshToken = get(req, "cookies.refreshToken") || get(req, "headers.x-refresh");
    console.log("access", accessToken);
    console.log("refresh", refreshToken);
    console.log("req", req.headers);
    if (!accessToken) {
        //throw new UnAuthorizedError("Access denied, login")
        return next();
    }
    const { decoded, expired } = (0, jwt_utils_js_1.verifyJwt)(accessToken);
    if (decoded) {
        res.locals.user = decoded; //assigns decoded to req.locals.user
        console.log("local", res.locals.user);
        return next();
    }
    if (expired && refreshToken) {
        console.log("refresh", refreshToken);
        let newAccessToken = await (0, session_service_js_1.reIssueAccessToken)(refreshToken, req);
        console.log("type", typeof (newAccessToken));
        if (typeof newAccessToken === "string") {
            res.setHeader("x-access-token", newAccessToken);
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                domain: config_1.default.get("localhost"),
                path: config_1.default.get("path"),
                sameSite: "strict",
                secure: false,
                maxAge: 900000
            }); //15mins
        }
        const result = (0, jwt_utils_js_1.verifyJwt)(newAccessToken);
        res.locals.user = result.decoded;
        return next();
    }
    return next();
}
exports.deserializeUser = deserializeUser;
async function verifyUser(req, res, next) {
    return deserializeUser(req, res, () => {
        if (res.locals.user.id === req.params.userId || res.locals.user.isAdmin) {
            return next();
        }
        else {
            return next((0, authentic_error_js_1.createCustomError)("You are not authenticated", 401));
        }
    });
}
exports.verifyUser = verifyUser;
async function verifyAdmin(req, res, next) {
    return deserializeUser(req, res, () => {
        console.log("isAdmin", res.locals.user);
        if (res.locals.user.isAdmin) {
            return next();
        }
        else {
            return next((0, authentic_error_js_1.createCustomError)("You are not authenticated", 401));
        }
    });
}
exports.verifyAdmin = verifyAdmin;
