import { Request,Response, NextFunction } from "express";
import express from "express";
import passport from "passport";
import config from "config"
import pool from "../utils/connect";
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import {Strategy as FacebookStrategy} from "passport-facebook";
import { addFacebookUser, addGoogleUser, getUserById } from "../queries/passport.queries";


passport.use(new GoogleStrategy({
    clientID:config.get<string>("googleClientId"),
    clientSecret:config.get<string>("googleClientSecret"),
    callbackURL:config.get<string>("googleOauthRedirectUrl")
}, async (accessToken, refreshToken, profile, callback) => {
    console.log("profile", profile)
    try {
        let user = await pool.query(getUserById, [profile.emails])
    if(user){
        console.log("User already exist")
        console.log("user",profile)
        return callback(null, profile)
    }else{
        console.log("User already exist")
        console.log("user",profile)
        console.log("No user, add a new user")
        const user = await pool.query(addGoogleUser,[profile.username, profile.emails, profile.displayName, profile.photos])
         return callback(null,profile)
    }
    } catch (error) {
        console.log(error)
    }
}))


passport.use(new FacebookStrategy({
    clientID:config.get("facebookClientId"),
    clientSecret:config.get("facebookClientSecret"),
    callbackURL:config.get("facebookOauthRedirectUrl"),
    profileFields:['emails','displayName','name','picture']
}, async (accessToken, refreshToken, profile, callback) => {
    console.log("profile", profile)
    try{
    const user = await pool.query(getUserById, [profile.emails])
    if(user){
        return callback(null, profile)
    }else{
        console.log("User already exist")
        console.log("user",profile)
        console.log("No user, add a new user")
        const user = await pool.query(addFacebookUser,[profile.username, profile.name, profile.photos, profile.gender, profile.birthday])
        return callback(null, profile)
    }
    }catch(err){
        console.log(err)
    }
})
)

passport.serializeUser((user,callback) => {
    callback(null, user)
})


passport.deserializeUser((user, callback) => {
    callback(null, user)
})


export async function isLoggedin (req:Request, res:Response, next:NextFunction){
    if(req.isAuthenticated()){
        return next()
    }else{
        res.redirect("/")
    }
}

