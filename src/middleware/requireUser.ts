import {Request,Response,NextFunction} from 'express';

//middleware to validate that a user is login but acessing any endpoint
const requireUser = (req:Request,res:Response,next:NextFunction) => {
    const user = res.locals.user //get user input
    console.log("userRe",user)
    if(!user){
        console.log("Notsending")
        return res.sendStatus(403)
    }
    console.log("sending")
    
    return next() //if the user is unknown response object
}

export default requireUser