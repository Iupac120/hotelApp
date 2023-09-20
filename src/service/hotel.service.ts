import { QueryResult } from "pg";
import { addHotel, checkName, deleteHotelById, getHotelById, getHotels, updateHotelById } from "../queries/hotel.queries.js";
import pool from "../utils/connect.js";
import { HotelDocument } from "../models/hotel.model.js";
import { BadRequestError, UnAuthorizedError } from "../errors/error.handler.js";


export async function createHotelService(hotel: HotelDocument) {
      const hotelExist:QueryResult = await pool.query(checkName,[hotel.name])
     if( hotelExist.rows.length){
         throw new BadRequestError("Hotel already exists")
     }
    const creatnewUser = await  pool.query(addHotel,
      [hotel.name,hotel.type, hotel.address, hotel.distance, hotel.photos, hotel.description, hotel.rating, hotel.rooms, hotel.cheapest_price, hotel.featured]
    );
    console.log("insert",creatnewUser)
      return creatnewUser.rows[0]
  }

  export async function getAllHotelsService(){
    const hotels =  await pool.query(getHotels)
    return hotels.rows
  } 

  export async function getSingleHotelService(hotelId:string){
    const hotelExist = await  pool.query(getHotelById,[hotelId])
    if(!hotelExist.rows.length) throw new UnAuthorizedError("Hotel not found")
    const hotels:QueryResult =  await pool.query(getHotelById, [hotelId])
    return hotels.rows[0]
  } 

  export async function updateHotelService(hotelId:number,hotel:HotelDocument){
    const hotelExist = await  pool.query(getHotelById,[hotelId])
    if(!hotelExist.rows.length) throw new UnAuthorizedError("Hotel not found")
    const hotels =  await pool.query(updateHotelById, [hotel.name, hotel.type, hotel.address, hotel.distance, hotel.photos, hotel.description, hotel.rating, hotel.rooms, hotel.cheapest_price, hotel.featured, hotelId])
    return hotels.rows[0]
  } 

  export async function deleteHotelService(hotelId:number){
    const hotelExist = await  pool.query(getHotelById,[hotelId])
    if(!hotelExist.rows.length) throw new UnAuthorizedError("Hotel not found")
    const hotels =  await pool.query(deleteHotelById, [hotelId])
    return hotels.rows[0]
  } 