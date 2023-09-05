"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoomNumberById = exports.getUpdateID = exports.deleteRoomNumberById = exports.getRoomNumberById = exports.getRoomNumbers = exports.addRoomNumber = exports.getRoomNumber = exports.isRoomUnique = exports.updateHotelId = exports.updateRoom_id = exports.addRoom = exports.updateRoomById = exports.deleteRoomById = exports.getRoomById = exports.getHotelId = exports.getRooms = void 0;
//create rooms
exports.getRooms = "SELECT * FROM room";
exports.getHotelId = "SELECT * FROM hotel WHERE hotel_id = $1";
exports.getRoomById = "SELECT * FROM room WHERE room_id = $1";
exports.deleteRoomById = "DELETE FROM room WHERE room_id = $1";
exports.updateRoomById = "UPDATE room SET title = $1, price = $2, max_people = $3, description = $4, room_numbers = $5 WHERE room_id = $6";
exports.addRoom = 'INSERT INTO room (title,price, max_people, description, room_numbers ) VALUES($1, $2, $3, $4, $5) RETURNING *';
exports.updateRoom_id = "SELECT * FROM room_numbers WHERE room_number_id = $1";
exports.updateHotelId = 'UPDATE hotel SET rooms = array_append(rooms, $1) WHERE hotel_id = $2 RETURNING *';
exports.isRoomUnique = "SELECT * FROM room WHERE room_numbers = $1";
//export const updateHotelId:string = "UPDATE hotel SET rooms = $1 WHERE hotel_id = $2"
//create room numbers
exports.getRoomNumber = "SELECT * FROM room_numbers WHERE room_number = $1";
exports.addRoomNumber = 'INSERT INTO room_numbers (room_number, unavailable_date) VALUES($1, $2) RETURNING *';
exports.getRoomNumbers = "SELECT * FROM room_numbers";
exports.getRoomNumberById = "SELECT * FROM room_numbers WHERE room_number = $1";
exports.deleteRoomNumberById = "DELETE FROM room_numbers WHERE room_number = $1";
exports.getUpdateID = "SELECT * FROM room_numbers WHERE room_number_id = $1";
exports.updateRoomNumberById = "UPDATE room_numbers SET room_number = $1, unavailable_date = $2 WHERE room_id = $3";
