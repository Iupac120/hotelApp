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
exports.getRoom = exports.getAllRooms = exports.deleteRoom = exports.updateRoom = exports.createRoom = exports.getRoomNumber = exports.getAllRoomNumber = exports.deleteRoomNumber = exports.updateRoomNumber = exports.createRoomNumber = void 0;
const room_service_1 = require("../service/room.service");
//import { createHotelInput, getHotelInput } from "../schema/hotel.schema";
//Room number controller
function createRoomNumber(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newRoomNumber = yield (0, room_service_1.createRoomNumberService)(req.body);
        return res.json(newRoomNumber);
    });
}
exports.createRoomNumber = createRoomNumber;
function updateRoomNumber(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const roomNumId = Number(req.params.roomId);
        const newUpdate = yield (0, room_service_1.updateRoomNumberService)(req.body, roomNumId);
        console.log("update", newUpdate);
        return res.status(201).json(newUpdate);
    });
}
exports.updateRoomNumber = updateRoomNumber;
function deleteRoomNumber(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const delRoomNum = yield (0, room_service_1.deleteRoomNumberService)(req.body);
        return res.status(201).json("Room number has been deleted");
    });
}
exports.deleteRoomNumber = deleteRoomNumber;
function getAllRoomNumber(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const roomNumber = yield (0, room_service_1.getAllRoomsNumberService)();
        console.log("roomNumber");
        return res.status(201).json(roomNumber);
    });
}
exports.getAllRoomNumber = getAllRoomNumber;
function getRoomNumber(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const roomNumber = yield (0, room_service_1.getSingleRoomNumberService)(req.body);
        return res.status(200).json(roomNumber);
    });
}
exports.getRoomNumber = getRoomNumber;
//Room controller
function createRoom(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const hotelId = Number(req.params.hotelId);
        const roomNumberId = Number(req.params.roomNumberId);
        const newRoom = yield (0, room_service_1.createRoomService)(req.body, hotelId, roomNumberId);
        return res.json(newRoom);
    });
}
exports.createRoom = createRoom;
function updateRoom(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const roomId = Number(req.params.roomId);
        const newUpdate = yield (0, room_service_1.updateRoomService)(req.body, roomId);
        return res.status(201).json(newUpdate);
    });
}
exports.updateRoom = updateRoom;
function deleteRoom(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const roomId = Number(req.params.roomId);
        yield (0, room_service_1.deleteRoomService)(roomId);
        return res.status(201).json("Room has been deleted");
    });
}
exports.deleteRoom = deleteRoom;
function getAllRooms(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const rooms = yield (0, room_service_1.getAllRoomsService)();
        console.log("rooms");
        return res.status(200).json(rooms);
    });
}
exports.getAllRooms = getAllRooms;
function getRoom(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const roomId = Number(req.params.roomId);
        const room = yield (0, room_service_1.getSingleRoomService)(roomId);
        return res.status(200).json(room);
    });
}
exports.getRoom = getRoom;
