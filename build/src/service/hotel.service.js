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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHotelService = exports.updateHotelService = exports.getSingleHotelService = exports.getAllHotelsService = exports.createHotelService = void 0;
const hotel_queries_1 = require("../queries/hotel.queries");
const connect_1 = __importDefault(require("../utils/connect"));
function createHotelService(hotel) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hotelExist = yield connect_1.default.query(hotel_queries_1.checkName, [hotel.name]);
            if (hotelExist.rows.length) {
                return false;
            }
            const creatnewUser = yield connect_1.default.query(hotel_queries_1.addHotel, [hotel.name, hotel.type, hotel.address, hotel.distance, hotel.photos, hotel.description, hotel.rating, hotel.rooms, hotel.cheapest_price, hotel.featured]);
            console.log("insert", creatnewUser);
            return creatnewUser.rows[0];
        }
        catch (e) {
            console.log(e);
            throw new Error(e);
        }
    });
}
exports.createHotelService = createHotelService;
function getAllHotelsService() {
    return __awaiter(this, void 0, void 0, function* () {
        const hotels = yield connect_1.default.query(hotel_queries_1.getHotels);
        return hotels.rows;
    });
}
exports.getAllHotelsService = getAllHotelsService;
function getSingleHotelService(hotelId) {
    return __awaiter(this, void 0, void 0, function* () {
        const hotels = yield connect_1.default.query(hotel_queries_1.getHotelById, [hotelId]);
        return hotels.rows[0];
    });
}
exports.getSingleHotelService = getSingleHotelService;
function updateHotelService(hotelId, hotel) {
    return __awaiter(this, void 0, void 0, function* () {
        const hotels = yield connect_1.default.query(hotel_queries_1.updateHotelById, [hotel.name, hotel.type, hotel.address, hotel.distance, hotel.photos, hotel.description, hotel.rating, hotel.rooms, hotel.cheapest_price, hotel.featured, hotelId]);
        return hotels.rows[0];
    });
}
exports.updateHotelService = updateHotelService;
function deleteHotelService(hotelId) {
    return __awaiter(this, void 0, void 0, function* () {
        const hotels = yield connect_1.default.query(hotel_queries_1.deleteHotelById, [hotelId]);
        return hotels.rows[0];
    });
}
exports.deleteHotelService = deleteHotelService;
