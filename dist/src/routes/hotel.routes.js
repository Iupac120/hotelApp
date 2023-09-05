"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotel_controller_1 = require("../controller/hotel.controller");
const trycatch_handler_1 = require("../utils/trycatch.handler");
const validateResources_1 = __importDefault(require("../middleware/validateResources"));
const hotel_schema_1 = require("../schema/hotel.schema");
const deserializeUser_1 = require("../middleware/deserializeUser");
const router = (0, express_1.Router)();
//hotels routes
router.post("/", deserializeUser_1.verifyAdmin, (0, validateResources_1.default)(hotel_schema_1.createHotelSchema), (0, trycatch_handler_1.trycatchHandler)(hotel_controller_1.createHotel));
router.get("/", (0, trycatch_handler_1.trycatchHandler)(hotel_controller_1.getAllHotel));
router.get("/:hotelId", (0, validateResources_1.default)(hotel_schema_1.getHotelSchema), (0, trycatch_handler_1.trycatchHandler)(hotel_controller_1.getHotel));
router.put("/:hotelId", deserializeUser_1.verifyAdmin, (0, validateResources_1.default)(hotel_schema_1.getHotelSchema), (0, trycatch_handler_1.trycatchHandler)(hotel_controller_1.updateHotel));
router.delete("/:hotelId", deserializeUser_1.verifyAdmin, (0, validateResources_1.default)(hotel_schema_1.getHotelSchema), (0, trycatch_handler_1.trycatchHandler)(hotel_controller_1.deleteHotel));
exports.default = router;
