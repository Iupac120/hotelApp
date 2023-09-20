"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoom = exports.getAllRooms = exports.deleteRoom = exports.updateRoom = exports.createRoom = exports.getRoomNumber = exports.getAllRoomNumber = exports.deleteRoomNumber = exports.updateRoomNumber = exports.createRoomNumber = void 0;
const room_service_js_1 = require("../service/room.service.js");
//import { createHotelInput, getHotelInput } from "../schema/hotel.schema";
//Room number controller
async function createRoomNumber(req, res) {
    const newRoomNumber = await (0, room_service_js_1.createRoomNumberService)(req.body);
    return res.json(newRoomNumber);
}
exports.createRoomNumber = createRoomNumber;
async function updateRoomNumber(req, res) {
    const roomNumId = Number(req.params.roomId);
    const newUpdate = await (0, room_service_js_1.updateRoomNumberService)(req.body, roomNumId);
    console.log("update", newUpdate);
    return res.status(201).json(newUpdate);
}
exports.updateRoomNumber = updateRoomNumber;
async function deleteRoomNumber(req, res) {
    const delRoomNum = await (0, room_service_js_1.deleteRoomNumberService)(req.body);
    return res.status(201).json("Room number has been deleted");
}
exports.deleteRoomNumber = deleteRoomNumber;
async function getAllRoomNumber(req, res) {
    const roomNumber = await (0, room_service_js_1.getAllRoomsNumberService)();
    console.log("roomNumber");
    return res.status(201).json(roomNumber);
}
exports.getAllRoomNumber = getAllRoomNumber;
async function getRoomNumber(req, res) {
    const roomNumber = await (0, room_service_js_1.getSingleRoomNumberService)(req.body);
    return res.status(200).json(roomNumber);
}
exports.getRoomNumber = getRoomNumber;
//Room controller
async function createRoom(req, res) {
    const hotelId = Number(req.params.hotelId);
    const roomNumberId = Number(req.params.roomNumberId);
    const newRoom = await (0, room_service_js_1.createRoomService)(req.body, hotelId, roomNumberId);
    return res.json(newRoom);
}
exports.createRoom = createRoom;
async function updateRoom(req, res) {
    const roomId = Number(req.params.roomId);
    const newUpdate = await (0, room_service_js_1.updateRoomService)(req.body, roomId);
    return res.status(201).json(newUpdate);
}
exports.updateRoom = updateRoom;
async function deleteRoom(req, res) {
    const roomId = Number(req.params.roomId);
    await (0, room_service_js_1.deleteRoomService)(roomId);
    return res.status(201).json("Room has been deleted");
}
exports.deleteRoom = deleteRoom;
async function getAllRooms(req, res) {
    const rooms = await (0, room_service_js_1.getAllRoomsService)();
    console.log("rooms");
    return res.status(200).json(rooms);
}
exports.getAllRooms = getAllRooms;
async function getRoom(req, res) {
    const roomId = Number(req.params.roomId);
    const room = await (0, room_service_js_1.getSingleRoomService)(roomId);
    return res.status(200).json(room);
}
exports.getRoom = getRoom;
