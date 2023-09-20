import { QueryResult } from "pg";
import pool from "../utils/connect.js";
import { RoomDocument, RoomNumberDocument } from "../models/room.model.js";
import { addRoom, addRoomNumber, deleteRoomById, deleteRoomNumberById, getHotelId, getRoomById, getRoomNumber, getRoomNumberById, getRoomNumbers, getRooms, getUpdateID, isRoomUnique, updateHotelId, updateRoomById, updateRoomNumberById, updateRoom_id } from "../queries/room.queries.js";
import { BadRequestError, NotFoundError, UnAuthorizedError } from "../errors/error.handler.js";


export async function createRoomNumberService(room: RoomNumberDocument) {
    const RoomNumberExist:QueryResult = await pool.query(getRoomNumber,[room.room_number])
    if(RoomNumberExist.rows.length){
         return false
     }
    const creatnewRoomNunber = await  pool.query(addRoomNumber,
      [room.room_number,room.unavailable_date]
    );
    return creatnewRoomNunber.rows[0]
  }


  export async function getAllRoomsNumberService(){
    const roomNumber =  await pool.query(getRoomNumbers)
    return roomNumber.rows
  } 

  export async function getSingleRoomNumberService(input:RoomNumberDocument){
    const roomNumber:QueryResult =  await pool.query(getRoomNumberById, [input.room_number])
    return roomNumber.rows[0]
  } 

  export async function updateRoomNumberService(input:RoomNumberDocument,roomId: number){
    const getRN = await pool.query(getUpdateID,[roomId])
    console.log("type", (getRN.rows.length))
    if(getRN.rows.length === 0){
      return 0
    }
    
    const roomNumber =  await pool.query(updateRoomNumberById, [input.room_number,input.unavailable_date,roomId])
    console.log("room",roomNumber)
    return roomNumber.rows[0]
  } 

export async function deleteRoomNumberService(input:RoomNumberDocument){
    const roomNumber =  await pool.query(deleteRoomNumberById, [input.room_number])
    return roomNumber.rows[0]
} 


export async function createRoomService(room: RoomDocument,hotelId:number,RoomNumberId: number) {
      const hotelExist:QueryResult = await pool.query(getHotelId,[hotelId])
    if( !hotelExist.rows.length){
         throw new UnAuthorizedError("Hotel does not exist")
     }
     const roomNumberExist:QueryResult = await pool.query(updateRoom_id,[RoomNumberId])
     if( !roomNumberExist.rows.length){
          throw new UnAuthorizedError("Room number does not exist")
      }
      const id = Number(roomNumberExist.rows[0].room_number_id)
    const checkRoom = await pool.query(isRoomUnique,[id])
    if(checkRoom.rows.length){
      throw new BadRequestError("Room is not unique")
    }
    const creatnewRoom = await  pool.query(addRoom,
      [room.title, room.price, room.max_people,room.description,id]
    );
    if(!creatnewRoom.rows.length){
      throw new NotFoundError("Room not created")
    }
    const hotelRoom = Number(creatnewRoom.rows[0].room_id)
    const updateHotel = await pool.query(updateHotelId,[hotelRoom,hotelId])
    return updateHotel.rows[0]
  }


  export async function getAllRoomsService(){
    const rooms =  await pool.query(getRooms)
    return rooms.rows
  } 

  export async function getSingleRoomService(roomId:number){
    const room:QueryResult =  await pool.query(getRoomById, [roomId])
    return room.rows[0]
  } 

  
  export async function updateRoomService(room:RoomDocument,roomId:number){
    const rooms =  await pool.query(updateRoomById, [room.title, room.price, room.max_people, room.description, room.room_numbers, roomId])
  } 


  export async function deleteRoomService(roomId:number){
    const rooms =  await pool.query(deleteRoomById, [roomId])
    return rooms.rows[0]
  } 