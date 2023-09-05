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
exports.deleteRoomService = exports.updateRoomService = exports.getSingleRoomService = exports.getAllRoomsService = exports.createRoomService = exports.deleteRoomNumberService = exports.updateRoomNumberService = exports.getSingleRoomNumberService = exports.getAllRoomsNumberService = exports.createRoomNumberService = void 0;
const connect_1 = __importDefault(require("../utils/connect"));
const room_queries_1 = require("../queries/room.queries");
const error_handler_1 = require("../errors/error.handler");
function createRoomNumberService(room) {
    return __awaiter(this, void 0, void 0, function* () {
        const RoomNumberExist = yield connect_1.default.query(room_queries_1.getRoomNumber, [room.room_number]);
        if (RoomNumberExist.rows.length) {
            return false;
        }
        const creatnewRoomNunber = yield connect_1.default.query(room_queries_1.addRoomNumber, [room.room_number, room.unavailable_date]);
        return creatnewRoomNunber.rows[0];
    });
}
exports.createRoomNumberService = createRoomNumberService;
function getAllRoomsNumberService() {
    return __awaiter(this, void 0, void 0, function* () {
        const roomNumber = yield connect_1.default.query(room_queries_1.getRoomNumbers);
        return roomNumber.rows;
    });
}
exports.getAllRoomsNumberService = getAllRoomsNumberService;
function getSingleRoomNumberService(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const roomNumber = yield connect_1.default.query(room_queries_1.getRoomNumberById, [input.room_number]);
        return roomNumber.rows[0];
    });
}
exports.getSingleRoomNumberService = getSingleRoomNumberService;
function updateRoomNumberService(input, roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        const getRN = yield connect_1.default.query(room_queries_1.getUpdateID, [roomId]);
        console.log("type", (getRN.rows.length));
        if (getRN.rows.length === 0) {
            return 0;
        }
        const roomNumber = yield connect_1.default.query(room_queries_1.updateRoomNumberById, [input.room_number, input.unavailable_date, roomId]);
        console.log("room", roomNumber);
        return roomNumber.rows[0];
    });
}
exports.updateRoomNumberService = updateRoomNumberService;
function deleteRoomNumberService(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const roomNumber = yield connect_1.default.query(room_queries_1.deleteRoomNumberById, [input.room_number]);
        return roomNumber.rows[0];
    });
}
exports.deleteRoomNumberService = deleteRoomNumberService;
function createRoomService(room, hotelId, RoomNumberId) {
    return __awaiter(this, void 0, void 0, function* () {
        const hotelExist = yield connect_1.default.query(room_queries_1.getHotelId, [hotelId]);
        if (!hotelExist.rows.length) {
            throw new error_handler_1.UnAuthorizedError("Hotel does not exist");
        }
        const roomNumberExist = yield connect_1.default.query(room_queries_1.updateRoom_id, [RoomNumberId]);
        if (!roomNumberExist.rows.length) {
            throw new error_handler_1.UnAuthorizedError("Room number does not exist");
        }
        const id = Number(roomNumberExist.rows[0].room_number_id);
        const checkRoom = yield connect_1.default.query(room_queries_1.isRoomUnique, [id]);
        if (checkRoom.rows.length) {
            throw new error_handler_1.BadRequestError("Room is not unique");
        }
        const creatnewRoom = yield connect_1.default.query(room_queries_1.addRoom, [room.title, room.price, room.max_people, room.description, id]);
        if (!creatnewRoom.rows.length) {
            throw new error_handler_1.NotFoundError("Room not created");
        }
        const hotelRoom = Number(creatnewRoom.rows[0].room_id);
        const updateHotel = yield connect_1.default.query(room_queries_1.updateHotelId, [hotelRoom, hotelId]);
        return updateHotel.rows[0];
    });
}
exports.createRoomService = createRoomService;
function getAllRoomsService() {
    return __awaiter(this, void 0, void 0, function* () {
        const rooms = yield connect_1.default.query(room_queries_1.getRooms);
        return rooms.rows;
    });
}
exports.getAllRoomsService = getAllRoomsService;
function getSingleRoomService(roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        const room = yield connect_1.default.query(room_queries_1.getRoomById, [roomId]);
        return room.rows[0];
    });
}
exports.getSingleRoomService = getSingleRoomService;
function updateRoomService(room, roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rooms = yield connect_1.default.query(room_queries_1.updateRoomById, [room.title, room.price, room.max_people, room.description, room.room_numbers, roomId]);
    });
}
exports.updateRoomService = updateRoomService;
function deleteRoomService(roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rooms = yield connect_1.default.query(room_queries_1.deleteRoomById, [roomId]);
        return rooms.rows[0];
    });
}
exports.deleteRoomService = deleteRoomService;
