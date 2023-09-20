"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHotelService = exports.updateHotelService = exports.getSingleHotelService = exports.getAllHotelsService = exports.createHotelService = void 0;
const hotel_queries_js_1 = require("../queries/hotel.queries.js");
const connect_js_1 = __importDefault(require("../utils/connect.js"));
const error_handler_js_1 = require("../errors/error.handler.js");
async function createHotelService(hotel) {
    const hotelExist = await connect_js_1.default.query(hotel_queries_js_1.checkName, [hotel.name]);
    if (hotelExist.rows.length) {
        throw new error_handler_js_1.BadRequestError("Hotel already exists");
    }
    const creatnewUser = await connect_js_1.default.query(hotel_queries_js_1.addHotel, [hotel.name, hotel.type, hotel.address, hotel.distance, hotel.photos, hotel.description, hotel.rating, hotel.rooms, hotel.cheapest_price, hotel.featured]);
    console.log("insert", creatnewUser);
    return creatnewUser.rows[0];
}
exports.createHotelService = createHotelService;
async function getAllHotelsService() {
    const hotels = await connect_js_1.default.query(hotel_queries_js_1.getHotels);
    return hotels.rows;
}
exports.getAllHotelsService = getAllHotelsService;
async function getSingleHotelService(hotelId) {
    const hotelExist = await connect_js_1.default.query(hotel_queries_js_1.getHotelById, [hotelId]);
    if (!hotelExist.rows.length)
        throw new error_handler_js_1.UnAuthorizedError("Hotel not found");
    const hotels = await connect_js_1.default.query(hotel_queries_js_1.getHotelById, [hotelId]);
    return hotels.rows[0];
}
exports.getSingleHotelService = getSingleHotelService;
async function updateHotelService(hotelId, hotel) {
    const hotelExist = await connect_js_1.default.query(hotel_queries_js_1.getHotelById, [hotelId]);
    if (!hotelExist.rows.length)
        throw new error_handler_js_1.UnAuthorizedError("Hotel not found");
    const hotels = await connect_js_1.default.query(hotel_queries_js_1.updateHotelById, [hotel.name, hotel.type, hotel.address, hotel.distance, hotel.photos, hotel.description, hotel.rating, hotel.rooms, hotel.cheapest_price, hotel.featured, hotelId]);
    return hotels.rows[0];
}
exports.updateHotelService = updateHotelService;
async function deleteHotelService(hotelId) {
    const hotelExist = await connect_js_1.default.query(hotel_queries_js_1.getHotelById, [hotelId]);
    if (!hotelExist.rows.length)
        throw new error_handler_js_1.UnAuthorizedError("Hotel not found");
    const hotels = await connect_js_1.default.query(hotel_queries_js_1.deleteHotelById, [hotelId]);
    return hotels.rows[0];
}
exports.deleteHotelService = deleteHotelService;
