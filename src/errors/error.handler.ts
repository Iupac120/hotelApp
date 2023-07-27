import { Request,Response,NextFunction } from "express";

export function errorHandler (err:any,req:Request,res:Response,next:NextFunction){
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })
}
export function BadRequestError (err:any,req:Request,res:Response,next:NextFunction){
    const errorStatus = err.status || 400
    const errorMessage = err.message || "Bad request error"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })
}

export function UnAuthorizedError (err:any,req:Request,res:Response,next:NextFunction){
    const errorStatus = err.status || 401
    const errorMessage = err.message || "Unauthorized error"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })
}

export function ForBiddenError (err:any,req:Request,res:Response,next:NextFunction){
    const errorStatus = err.status || 403
    const errorMessage = err.message || "Forbidden error"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })
}

export function NotFoundError (err:any,req:Request,res:Response,next:NextFunction){
    const errorStatus = err.status || 404
    const errorMessage = err.message || "Not found error"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })
}