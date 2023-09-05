"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotelSchema = exports.createRoomSchema = exports.createRoomNumberSchema = void 0;
const zod_1 = require("zod");
exports.createRoomNumberSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        room_number: (0, zod_1.number)({ required_error: "Room number is required" }),
        unavailable_date: (0, zod_1.array)((0, zod_1.string)({ required_error: "Date is required" }))
    })
});
exports.createRoomSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({ required_error: "Title is required" }),
        price: (0, zod_1.number)({ required_error: "Price is required" }),
        max_people: (0, zod_1.number)({ required_error: "Max number of occupant is required" }),
        description: (0, zod_1.string)({ required_error: "Description is required" })
    })
});
//request params
exports.getHotelSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        hotelId: (0, zod_1.string)({ required_error: "hotel id is required" })
    })
});
