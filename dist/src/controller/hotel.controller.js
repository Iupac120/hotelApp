"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotel = exports.getAllHotel = exports.deleteHotel = exports.updateHotel = exports.createHotel = void 0;
const hotel_service_1 = require("../service/hotel.service");
//import { createHotelInput, getHotelInput } from "../schema/hotel.schema";
function createHotel(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newHotel = yield (0, hotel_service_1.createHotelService)(req.body);
        return res.json(newHotel);
    });
}
exports.createHotel = createHotel;
function updateHotel(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const hotelId = Number(req.params.hotelId);
        const newUpdate = yield (0, hotel_service_1.updateHotelService)(hotelId, req.body);
        return res.status(201).json(newUpdate);
    });
}
exports.updateHotel = updateHotel;
function deleteHotel(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const hotelId = Number(req.params.hotelId);
        const deleHotel = yield (0, hotel_service_1.deleteHotelService)(hotelId);
        return res.status(201).json("Hotel has been deleted");
    });
}
exports.deleteHotel = deleteHotel;
function getAllHotel(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const hotels = yield (0, hotel_service_1.getAllHotelsService)();
        console.log("hotels");
        return res.status(200).json(hotels);
    });
}
exports.getAllHotel = getAllHotel;
function getHotel(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hotelId = req.params.hotelId;
            const hotel = yield (0, hotel_service_1.getSingleHotelService)(hotelId);
            return res.status(200).json(hotel);
        }
        catch (e) {
            console.log(e);
            throw new Error(e);
        }
    });
}
exports.getHotel = getHotel;
