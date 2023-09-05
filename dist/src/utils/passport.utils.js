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
const passport_1 = __importDefault(require("passport"));
const config_1 = __importDefault(require("config"));
const connect_1 = __importDefault(require("../utils/connect"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_facebook_1 = require("passport-facebook");
const passport_queries_1 = require("../queries/passport.queries");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: config_1.default.get("googleClientId"),
    clientSecret: config_1.default.get("googleClientSecret"),
    callbackURL: config_1.default.get("googleOauthRedirectUrl")
}, (accessToken, refreshToken, profile, callback) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("profile", profile);
    try {
        let user = yield connect_1.default.query(passport_queries_1.getUserById, [profile.emails]);
        if (user) {
            console.log("User already exist");
            console.log("user", profile);
            return callback(null, profile);
        }
        else {
            console.log("User already exist");
            console.log("user", profile);
            console.log("No user, add a new user");
            const user = yield connect_1.default.query(passport_queries_1.addGoogleUser, [profile.username, profile.emails, profile.displayName, profile.photos]);
            return callback(null, profile);
        }
    }
    catch (error) {
        console.log(error);
    }
})));
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: config_1.default.get("facebookClientId"),
    clientSecret: config_1.default.get("facebookClientSecret"),
    callbackURL: config_1.default.get("facebookOauthRedirectUrl"),
    profileFields: ['emails', 'displayName', 'name', 'picture']
}, (accessToken, refreshToken, profile, callback) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("profile", profile);
    try {
        const user = yield connect_1.default.query(passport_queries_1.getUserById, [profile.emails]);
        if (user) {
            return callback(null, profile);
        }
        else {
            console.log("User already exist");
            console.log("user", profile);
            console.log("No user, add a new user");
            const user = yield connect_1.default.query(passport_queries_1.addFacebookUser, [profile.username, profile.name, profile.photos, profile.gender, profile.birthday]);
            return callback(null, profile);
        }
    }
    catch (err) {
        console.log(err);
    }
})));
passport_1.default.serializeUser((user, callback) => {
    callback(null, user);
});
passport_1.default.deserializeUser((user, callback) => {
    callback(null, user);
});
