import { Request,Response } from "express";
import { createHotelService,updateHotelService, deleteHotelService,getAllHotelsService,getSingleHotelService } from "../service/hotel.service";
import { createHotelInput, getHotelInput } from "../schema/hotel.schema";

export async function createHotel (req:Request,res:Response){
    const newHotel =  createHotelService(req.body)
    res.status(201).json(newHotel)
}
export async function updateHotel (req:Request<getHotelInput,createHotelInput>,res:Response){
    const newUpdate = updateHotelService(req.body,req.params)
    res.status(201).json(newUpdate)
}
export async function deleteHotel (req:Request,res:Response){
    const deleHotel = deleteHotelService(req.params)
    res.status(201).json("Hotel has been deleted")
}
export async function getHotel (req:Request,res:Response){

}
export async function getAllHotel (req:Request,res:Response){}