"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotel_controller_js_1 = require("../controller/hotel.controller.js");
const trycatch_handler_js_1 = require("../utils/trycatch.handler.js");
const validateResources_js_1 = __importDefault(require("../middleware/validateResources.js"));
const hotel_schema_js_1 = require("../schema/hotel.schema.js");
const deserializeUser_js_1 = require("../middleware/deserializeUser.js");
const router = (0, express_1.Router)();
//hotels routes
router.post("/", deserializeUser_js_1.verifyAdmin, (0, validateResources_js_1.default)(hotel_schema_js_1.createHotelSchema), (0, trycatch_handler_js_1.trycatchHandler)(hotel_controller_js_1.createHotel));
router.get("/", (0, trycatch_handler_js_1.trycatchHandler)(hotel_controller_js_1.getAllHotel));
router.get("/:hotelId", (0, validateResources_js_1.default)(hotel_schema_js_1.getHotelSchema), (0, trycatch_handler_js_1.trycatchHandler)(hotel_controller_js_1.getHotel));
router.put("/:hotelId", deserializeUser_js_1.verifyAdmin, (0, validateResources_js_1.default)(hotel_schema_js_1.getHotelSchema), (0, trycatch_handler_js_1.trycatchHandler)(hotel_controller_js_1.updateHotel));
router.delete("/:hotelId", deserializeUser_js_1.verifyAdmin, (0, validateResources_js_1.default)(hotel_schema_js_1.getHotelSchema), (0, trycatch_handler_js_1.trycatchHandler)(hotel_controller_js_1.deleteHotel));
exports.default = router;
