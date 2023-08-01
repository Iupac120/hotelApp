"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const room_controller_1 = require("../controller/room.controller");
const trycatch_handler_1 = require("../utils/trycatch.handler");
const router = express_1.default.Router();
//Room number routes
router.post("/room_number", (0, trycatch_handler_1.trycatchHandler)(room_controller_1.createRoomNumber));
router.get("/room_number", (0, trycatch_handler_1.trycatchHandler)(room_controller_1.getAllRoomNumber));
router.get("/room_number/id", (0, trycatch_handler_1.trycatchHandler)(room_controller_1.getRoomNumber));
router.put("/room_number/:roomId", (0, trycatch_handler_1.trycatchHandler)(room_controller_1.updateRoomNumber));
router.delete("/room_number", (0, trycatch_handler_1.trycatchHandler)(room_controller_1.deleteRoomNumber));
//room routes
router.post("/:hotelId/:roomNumberId", (0, trycatch_handler_1.trycatchHandler)(room_controller_1.createRoom));
router.get("/", (0, trycatch_handler_1.trycatchHandler)(room_controller_1.getAllRooms));
router.get("/:roomId", (0, trycatch_handler_1.trycatchHandler)(room_controller_1.getRoom));
router.put("/:roomId", (0, trycatch_handler_1.trycatchHandler)(room_controller_1.updateRoom));
router.delete("/:roomId", room_controller_1.deleteRoom);
exports.default = router;
