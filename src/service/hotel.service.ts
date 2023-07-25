import { QueryResult } from "pg";
import { addHotel, checkName, deleteHotelById, getHotelById, getHotels, updateHotelById } from "../queries/hotel.queries";
import pool from "../utils/connect";
import { HotelDocument } from "../models/hotel.model";


export async function createHotelService(hotel: HotelDocument) {
    try {
      const hotelExist:QueryResult = await pool.query(checkName,[hotel.name])
     if( hotelExist.rows.length){
         return false
     }
    const creatnewUser = await  pool.query(addHotel,
      [hotel.name,hotel.type, hotel.address, hotel.distance, hotel.photos, hotel.description, hotel.rating, hotel.rooms, hotel.cheapest_price, hotel.featured]
    );
    console.log("insert",creatnewUser)
      return creatnewUser.rows[0]
    } catch (e:any) {
      console.log(e)
      throw new Error(e)
    }
  }

  export async function getAllHotelsService(){
    const hotels =  await pool.query(getHotels)
    return hotels.rows
  } 

  export async function getSingleHotelService(hotelId:number){
    const hotels:QueryResult =  await pool.query(getHotelById, [hotelId])
    return hotels.rows[0]
  } 

  export async function updateHotelService(hotelId:number,hotel:HotelDocument){
    const hotels =  await pool.query(updateHotelById, [hotel.name, hotel.type, hotel.address, hotel.distance, hotel.photos, hotel.description, hotel.rating, hotel.rooms, hotel.cheapest_price, hotel.featured, hotelId])
    return hotels.rows[0]
  } 

  export async function deleteHotelService(hotelId:number){
    const hotels =  await pool.query(deleteHotelById, [hotelId])
    return hotels.rows[0]
  } 