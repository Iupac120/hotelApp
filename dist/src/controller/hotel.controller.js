"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotel = exports.getAllHotel = exports.deleteHotel = exports.updateHotel = exports.createHotel = void 0;
const hotel_service_js_1 = require("../service/hotel.service.js");
//import { createHotelInput, getHotelInput } from "../schema/hotel.schema";
async function createHotel(req, res) {
    const newHotel = await (0, hotel_service_js_1.createHotelService)(req.body);
    return res.json(newHotel);
}
exports.createHotel = createHotel;
async function updateHotel(req, res) {
    const hotelId = Number(req.params.hotelId);
    const newUpdate = await (0, hotel_service_js_1.updateHotelService)(hotelId, req.body);
    return res.status(201).json(newUpdate);
}
exports.updateHotel = updateHotel;
async function deleteHotel(req, res) {
    const hotelId = Number(req.params.hotelId);
    const deleHotel = await (0, hotel_service_js_1.deleteHotelService)(hotelId);
    return res.status(201).json("Hotel has been deleted");
}
exports.deleteHotel = deleteHotel;
async function getAllHotel(req, res) {
    const hotels = await (0, hotel_service_js_1.getAllHotelsService)();
    console.log("hotels");
    return res.status(200).json(hotels);
}
exports.getAllHotel = getAllHotel;
async function getHotel(req, res) {
    try {
        const hotelId = req.params.hotelId;
        const hotel = await (0, hotel_service_js_1.getSingleHotelService)(hotelId);
        return res.status(200).json(hotel);
    }
    catch (e) {
        console.log(e);
        throw new Error(e);
    }
}
exports.getHotel = getHotel;
