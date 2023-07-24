import { Request,Response,NextFunction } from "express";

export function createError (status:number,message:any){
    const err = new Error()
    err.status = status;
    err.message = message
    return err
}