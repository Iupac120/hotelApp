import { QueryResult } from "pg";
import pool from "../utils/connect";
import { RoomDocument, RoomNumberDocument } from "../models/room.model";
import { addRoom, addRoomNumber, deleteRoomById, deleteRoomNumberById, getHotelId, getRoomById, getRoomNumber, getRoomNumberById, getRoomNumbers, getRooms, updateHotelId, updateRoomById, updateRoomNumberById } from "../queries/room.queries";


export async function createRoomNumberService(room: RoomNumberDocument) {
    const RoomNumberExist:QueryResult = await pool.query(getRoomNumber,[room.room_number])
    if(RoomNumberExist){
         return false
     }
    const creatnewRoomNunber = await  pool.query(addRoomNumber,
      [room.room_number,room.unavailable_date]
    );
    console.log("insert",creatnewRoomNunber)
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

  export async function updateRoomNumberService(input:RoomNumberDocument){
    const roomNumber =  await pool.query(updateRoomNumberById, [input.room_number,input.unavailable_date])
    return roomNumber.rows[0]
  } 

export async function deleteRoomNumberService(input:RoomNumberDocument){
    const roomNumber =  await pool.query(deleteRoomNumberById, [input.room_number])
    return roomNumber.rows[0]
} 


export async function createRoomService(room: RoomDocument,hotelId:number) {
    const hotelExist:QueryResult = await pool.query(getHotelId,[hotelId])
     if( !hotelExist){
         return false
     }
    const creatnewRoom = await  pool.query(addRoom,
      [room.title, room.price, room.max_people,room.description]
    );
    if(!creatnewRoom){
      return false
    }
    const updateHotel = await pool.query(updateHotelId,[creatnewRoom,hotelId])
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