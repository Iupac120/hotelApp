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
exports.reIssueAccessToken = exports.calculateCartTotal = void 0;
//import sessionModel,{SessionDocument} from '../models/session.model';
const jwt_utils_1 = require("../utils/jwt.utils");
const connect_1 = __importDefault(require("../utils/connect"));
//import { findUser } from './user.service';
const config_1 = __importDefault(require("config"));
const jwt_utils_2 = require("../utils/jwt.utils");
const error_handler_1 = require("../errors/error.handler");
//import { findSession } from '../queries/session.queries';
const auth_queries_1 = require("../queries/auth.queries");
function calculateCartTotal(cart) {
    return __awaiter(this, void 0, void 0, function* () {
        let totalQuantity = 0;
        let totalPrice = 0;
        for (const itemId in cart) {
            const item = cart[itemId];
            console.log("item", item);
            totalQuantity += item.quantity;
            totalPrice += item.quantity * item.price;
            console.log("item", totalPrice, totalQuantity);
        }
        return {
            totalQuantity,
            totalPrice,
        };
    });
}
exports.calculateCartTotal = calculateCartTotal;
function reIssueAccessToken(refreshToken, req) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("decodedRefresh", refreshToken);
        const decoded = (0, jwt_utils_1.verifyJwt)(refreshToken);
        console.log("decoded", decoded);
        if (!decoded)
            throw new error_handler_1.UnAuthorizedError("Token does not exist");
        const { id } = decoded.decoded;
        console.log("id", id);
        const user = yield connect_1.default.query(auth_queries_1.findUserSession, [id]);
        if (!user)
            throw new error_handler_1.UnAuthorizedError("User does not exist");
        console.log("user", user.rows[0]);
        const newuser = user.rows[0];
        const userAgent = req.get("user-agent") || "";
        const accesToken = (0, jwt_utils_2.signJwt)(Object.assign(Object.assign({}, newuser), { id: newuser.user_id, isAdmin: newuser.is_admin, userAgent }), {
            expiresIn: config_1.default.get("accessTokenTtl")
        });
        return accesToken;
    });
}
exports.reIssueAccessToken = reIssueAccessToken;
