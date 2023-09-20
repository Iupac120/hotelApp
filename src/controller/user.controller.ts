import { Request,Response } from "express";
import { deleteUserService, getAllUsersService, getSingleUserService, updateUserService } from "../service/user.service.js";



export async function updateUser (req:Request,res:Response){
    const userId = Number(req.params.userId)
    const newUpdate = await updateUserService(req.body,userId)
    return res.status(201).json(newUpdate)
}
export async function deleteUser (req:Request,res:Response){
    const userId = Number(req.params.userId)
    const delUser = await deleteUserService(userId)
    if(!delUser){
        throw new Error("Failed to delete user")
    }
    return res.status(201).json("Hotel has been deleted")
}
export async function getAllUsers (req:Request,res:Response){
    const users = await getAllUsersService()
    console.log("user",users)
    return res.status(200).json(users)
}
export async function getUser (req:Request,res:Response){
    try {
        const userId = Number(req.params.userId)
        const user = await getSingleUserService(userId)
        return res.status(200).json(user)
    } catch (e:any) {
      console.log(e) 
      throw new Error(e) 
    }
}
