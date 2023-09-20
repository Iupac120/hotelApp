import { Request,Response } from "express";
import { createHotelService,updateHotelService, deleteHotelService,getAllHotelsService,getSingleHotelService } from "../service/hotel.service.js";
import { getHotelInput } from "../schema/hotel.schema.js";
//import { createHotelInput, getHotelInput } from "../schema/hotel.schema";

export async function createHotel (req:Request,res:Response){
    const newHotel = await createHotelService(req.body)
    return res.json(newHotel)
}
export async function updateHotel (req:Request,res:Response){
    const hotelId = Number(req.params.hotelId)
    const newUpdate = await updateHotelService(hotelId,req.body)
    return res.status(201).json(newUpdate)
}
export async function deleteHotel (req:Request,res:Response){
    const hotelId = Number(req.params.hotelId)
    const deleHotel = await deleteHotelService(hotelId)
    return res.status(201).json("Hotel has been deleted")
}
export async function getAllHotel (req:Request,res:Response){
    const hotels = await getAllHotelsService()
    console.log("hotels")
    return res.status(200).json(hotels)
}
export async function getHotel (req:Request,res:Response){
    try {
        const hotelId = req.params.hotelId
        const hotel = await getSingleHotelService(hotelId)
        return res.status(200).json(hotel)
    } catch (e:any) {
      console.log(e) 
      throw new Error(e) 
    }
}