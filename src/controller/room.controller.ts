import { Request,Response } from "express";
import { createRoomNumberService, createRoomService, deleteRoomNumberService, deleteRoomService, getAllRoomsNumberService, getAllRoomsService, getSingleRoomNumberService, getSingleRoomService, updateRoomNumberService, updateRoomService } from "../service/room.service";
//import { createHotelInput, getHotelInput } from "../schema/hotel.schema";

//Room number controller
export async function createRoomNumber (req:Request,res:Response){
    const newRoomNumber = await createRoomNumberService(req.body)
    return res.json(newRoomNumber)
}
export async function updateRoomNumber (req:Request,res:Response){
    const roomNumId = Number(req.params.roomId)
    const newUpdate = await updateRoomNumberService(req.body,roomNumId)
    console.log("update",newUpdate)
    return res.status(201).json(newUpdate)
}
export async function deleteRoomNumber (req:Request,res:Response){
    const delRoomNum = await deleteRoomNumberService(req.body)
    return res.status(201).json("Room number has been deleted")
}

export async function getAllRoomNumber (req:Request,res:Response){
    const roomNumber = await getAllRoomsNumberService()
    console.log("roomNumber")
    return res.status(201).json(roomNumber)
}

export async function getRoomNumber (req:Request,res:Response){
        const roomNumber = await getSingleRoomNumberService(req.body)
        return res.status(200).json(roomNumber)
}

//Room controller
export async function createRoom (req:Request,res:Response){
    const hotelId = Number(req.params.hotelId)
    const roomNumberId = Number(req.params.roomNumberId)
    const newRoom = await createRoomService(req.body,hotelId,roomNumberId)
    return res.json(newRoom)
}

export async function updateRoom (req:Request,res:Response){
    const roomId = Number(req.params.roomId)
    const newUpdate = await updateRoomService(req.body, roomId)
    return res.status(201).json(newUpdate)
}
export async function deleteRoom (req:Request,res:Response){
    const roomId = Number(req.params.roomId)
    await deleteRoomService(roomId)
    return res.status(201).json("Room has been deleted")
}
export async function getAllRooms (req:Request,res:Response){
    const rooms = await getAllRoomsService()
    console.log("rooms")
    return res.status(200).json(rooms)
}
export async function getRoom (req:Request,res:Response){
        const roomId = Number(req.params.roomId)
        const room = await getSingleRoomService(roomId)
        return res.status(200).json(room)
}