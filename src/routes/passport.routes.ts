import { Request,Response, Router } from "express";
import passport from "passport"
import { isLoggedin } from "../controller/passport.controller";
const router = Router()

router.get("/login/google", passport.authenticate('google',{scope:['profile email']}))
router.get("/login/facebook", passport.authenticate('facebook'))

router.get("/google", passport.authenticate('google'), (req:Request,res:Response) => {
    res.redirect("/profile")
})

router.get("/facebook", passport.authenticate('facebook'), (req:Request,res:Response) => {
    res.redirect("/profile")
})

router.get("/profile", isLoggedin ,(req:Request,res:Response) => {
    res.send(req.user? req.user : `Not logged in, login with facebook or google`)
}) 

router.get("/logout",   (req:Request,res:Response) => {
    req.logout((err:any) => {
        if(err){
            console.log(err)
        }else{
            console.log("Succesfully logged out")
        }
    });
    res.redirect("/")
})




export default router