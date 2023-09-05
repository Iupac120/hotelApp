"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addHotel = exports.checkName = exports.updateHotelById = exports.deleteHotelById = exports.getHotelById = exports.getHotels = void 0;
exports.getHotels = "SELECT * FROM hotel";
exports.getHotelById = "SELECT * FROM hotel WHERE hotel_id = $1";
exports.deleteHotelById = "DELETE FROM hotel WHERE hotel_id = $1";
exports.updateHotelById = "UPDATE hotel SET name = $1,type = $2, address = $3, distance = $4, photos = $5, description = $6, rating = $7, rooms = $8, cheapest_price = $9, featured = $10 WHERE hotel_id = $11";
exports.checkName = "SELECT * FROM hotel WHERE name = $1";
exports.addHotel = 'INSERT INTO hotel (name,type, address, distance, photos, description, rating, rooms, cheapest_price, featured) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
