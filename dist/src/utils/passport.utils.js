"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const config_1 = __importDefault(require("config"));
const connect_js_1 = __importDefault(require("../utils/connect.js"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_facebook_1 = require("passport-facebook");
const passport_queries_js_1 = require("../queries/passport.queries.js");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: config_1.default.get("googleClientId"),
    clientSecret: config_1.default.get("googleClientSecret"),
    callbackURL: config_1.default.get("googleOauthRedirectUrl")
}, async (accessToken, refreshToken, profile, callback) => {
    console.log("profile", profile);
    try {
        let user = await connect_js_1.default.query(passport_queries_js_1.getUserById, [profile.emails]);
        if (user) {
            console.log("User already exist");
            console.log("user", profile);
            return callback(null, profile);
        }
        else {
            console.log("User already exist");
            console.log("user", profile);
            console.log("No user, add a new user");
            const user = await connect_js_1.default.query(passport_queries_js_1.addGoogleUser, [profile.username, profile.emails, profile.displayName, profile.photos]);
            return callback(null, profile);
        }
    }
    catch (error) {
        console.log(error);
    }
}));
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: config_1.default.get("facebookClientId"),
    clientSecret: config_1.default.get("facebookClientSecret"),
    callbackURL: config_1.default.get("facebookOauthRedirectUrl"),
    profileFields: ['emails', 'displayName', 'name', 'picture']
}, async (accessToken, refreshToken, profile, callback) => {
    console.log("profile", profile);
    try {
        const user = await connect_js_1.default.query(passport_queries_js_1.getUserById, [profile.emails]);
        if (user) {
            return callback(null, profile);
        }
        else {
            console.log("User already exist");
            console.log("user", profile);
            console.log("No user, add a new user");
            const user = await connect_js_1.default.query(passport_queries_js_1.addFacebookUser, [profile.username, profile.name, profile.photos, profile.gender, profile.birthday]);
            return callback(null, profile);
        }
    }
    catch (err) {
        console.log(err);
    }
}));
passport_1.default.serializeUser((user, callback) => {
    callback(null, user);
});
passport_1.default.deserializeUser((user, callback) => {
    callback(null, user);
});
