"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotelSchema = exports.createHotelSchema = void 0;
const zod_1 = require("zod");
exports.createHotelSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: "Name is required" }),
        type: (0, zod_1.string)({ required_error: "Type is required" }),
        address: (0, zod_1.string)({ required_error: "Address is required" }),
        distance: (0, zod_1.string)({ required_error: "Distance is required" }),
        photo: (0, zod_1.string)({ required_error: "Photo is required" }),
        description: (0, zod_1.string)({ required_error: "Description is required" }),
        rating: (0, zod_1.number)({ required_error: 'Rating is required' }).min(0, "The minimum is 0").max(5, "The maximum is 5"),
        rooms: (0, zod_1.string)({ required_error: "Room is required" }),
        cheapest_price: (0, zod_1.number)({ required_error: "Cheapest_price is required" }),
    })
});
//request params
exports.getHotelSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        hotelId: (0, zod_1.number)({ required_error: "Product id is required" })
    })
});
