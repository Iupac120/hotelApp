import {Request,Response} from "express"
import path from "path";

import multer from "multer"
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,path.join(__dirname,"../images"))
        console.log("cb",path.join(__dirname,"../images"))
    },
    filename:(req,file,cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

export const upload = multer({storage:storage})

export async function uploadImage (req:Request,res:Response){
    res.send("image uploaded")
}

export async function image (req:Request,res:Response){
    console.log("image")
    res.render("upload")
}