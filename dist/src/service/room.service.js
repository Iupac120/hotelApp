"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoomService = exports.updateRoomService = exports.getSingleRoomService = exports.getAllRoomsService = exports.createRoomService = exports.deleteRoomNumberService = exports.updateRoomNumberService = exports.getSingleRoomNumberService = exports.getAllRoomsNumberService = exports.createRoomNumberService = void 0;
const connect_1 = __importDefault(require("../utils/connect"));
const room_queries_1 = require("../queries/room.queries");
const error_handler_1 = require("../errors/error.handler");
async function createRoomNumberService(room) {
    const RoomNumberExist = await connect_1.default.query(room_queries_1.getRoomNumber, [room.room_number]);
    if (RoomNumberExist.rows.length) {
        return false;
    }
    const creatnewRoomNunber = await connect_1.default.query(room_queries_1.addRoomNumber, [room.room_number, room.unavailable_date]);
    return creatnewRoomNunber.rows[0];
}
exports.createRoomNumberService = createRoomNumberService;
async function getAllRoomsNumberService() {
    const roomNumber = await connect_1.default.query(room_queries_1.getRoomNumbers);
    return roomNumber.rows;
}
exports.getAllRoomsNumberService = getAllRoomsNumberService;
async function getSingleRoomNumberService(input) {
    const roomNumber = await connect_1.default.query(room_queries_1.getRoomNumberById, [input.room_number]);
    return roomNumber.rows[0];
}
exports.getSingleRoomNumberService = getSingleRoomNumberService;
async function updateRoomNumberService(input, roomId) {
    const getRN = await connect_1.default.query(room_queries_1.getUpdateID, [roomId]);
    console.log("type", (getRN.rows.length));
    if (getRN.rows.length === 0) {
        return 0;
    }
    const roomNumber = await connect_1.default.query(room_queries_1.updateRoomNumberById, [input.room_number, input.unavailable_date, roomId]);
    console.log("room", roomNumber);
    return roomNumber.rows[0];
}
exports.updateRoomNumberService = updateRoomNumberService;
async function deleteRoomNumberService(input) {
    const roomNumber = await connect_1.default.query(room_queries_1.deleteRoomNumberById, [input.room_number]);
    return roomNumber.rows[0];
}
exports.deleteRoomNumberService = deleteRoomNumberService;
async function createRoomService(room, hotelId, RoomNumberId) {
    const hotelExist = await connect_1.default.query(room_queries_1.getHotelId, [hotelId]);
    if (!hotelExist.rows.length) {
        throw new error_handler_1.UnAuthorizedError("Hotel does not exist");
    }
    const roomNumberExist = await connect_1.default.query(room_queries_1.updateRoom_id, [RoomNumberId]);
    if (!roomNumberExist.rows.length) {
        throw new error_handler_1.UnAuthorizedError("Room number does not exist");
    }
    const id = Number(roomNumberExist.rows[0].room_number_id);
    const checkRoom = await connect_1.default.query(room_queries_1.isRoomUnique, [id]);
    if (checkRoom.rows.length) {
        throw new error_handler_1.BadRequestError("Room is not unique");
    }
    const creatnewRoom = await connect_1.default.query(room_queries_1.addRoom, [room.title, room.price, room.max_people, room.description, id]);
    if (!creatnewRoom.rows.length) {
        throw new error_handler_1.NotFoundError("Room not created");
    }
    const hotelRoom = Number(creatnewRoom.rows[0].room_id);
    const updateHotel = await connect_1.default.query(room_queries_1.updateHotelId, [hotelRoom, hotelId]);
    return updateHotel.rows[0];
}
exports.createRoomService = createRoomService;
async function getAllRoomsService() {
    const rooms = await connect_1.default.query(room_queries_1.getRooms);
    return rooms.rows;
}
exports.getAllRoomsService = getAllRoomsService;
async function getSingleRoomService(roomId) {
    const room = await connect_1.default.query(room_queries_1.getRoomById, [roomId]);
    return room.rows[0];
}
exports.getSingleRoomService = getSingleRoomService;
async function updateRoomService(room, roomId) {
    const rooms = await connect_1.default.query(room_queries_1.updateRoomById, [room.title, room.price, room.max_people, room.description, room.room_numbers, roomId]);
}
exports.updateRoomService = updateRoomService;
async function deleteRoomService(roomId) {
    const rooms = await connect_1.default.query(room_queries_1.deleteRoomById, [roomId]);
    return rooms.rows[0];
}
exports.deleteRoomService = deleteRoomService;
