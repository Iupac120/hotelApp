import{Request,Response,NextFunction} from "express"

export function trycatchHandler (controller:any) {
   return async function (req:Request,res:Response,next:NextFunction){
    try{
        await controller(req,res,next)
    }catch(err:any){
        next(err)
    }
   }
}