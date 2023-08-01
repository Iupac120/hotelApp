"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotel_controller_1 = require("../controller/hotel.controller");
const router = (0, express_1.Router)();
//hotels routes
router.post("/", hotel_controller_1.createHotel);
router.get("/", hotel_controller_1.getAllHotel);
router.get("/:hotelId", hotel_controller_1.getHotel);
router.put("/:hotelId", hotel_controller_1.updateHotel);
router.delete("/:hotelId", hotel_controller_1.deleteHotel);
exports.default = router;
