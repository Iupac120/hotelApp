import { Request,Response, NextFunction } from "express";
import express from "express";

export async function isLoggedin (req:Request, res:Response, next:NextFunction){
    if(req.isAuthenticated()){
        return next()
    }else{
        res.redirect("/")
    }
}

