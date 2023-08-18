import { Request,Response,NextFunction } from "express";
import { CustomError } from "./authentic.error";
import { string } from "zod";
export function errorHandler (err:any,req:Request,res:Response,next:NextFunction){
    if(err instanceof CustomError){
        return res.status(err.status).json({
            msg:err.message,
            stack: process.env.NODE_ENV === 'production'? null: err.stack
        })
    }else{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })
}
}
export class BadRequestError extends CustomError {
    constructor(message:string){
        super(message,400)
    }
}

export class UnAuthorizedError extends CustomError{
    constructor(message:string){
        super(message,401)
    }
}

export class ForBiddenError extends CustomError{
    constructor(message:string){
        super(message,403)
    }
}

export class NotFoundError extends CustomError{
    constructor(message:string){
        super(message,404)
    }
}