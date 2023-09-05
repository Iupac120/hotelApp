"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const room_controller_1 = require("../controller/room.controller");
const trycatch_handler_1 = require("../utils/trycatch.handler");
const deserializeUser_1 = require("../middleware/deserializeUser");
const validateResources_1 = __importDefault(require("../middleware/validateResources"));
const room_schema_1 = require("../schema/room.schema");
const router = express_1.default.Router();
//Room number routes
router.post("/room_number", deserializeUser_1.verifyAdmin, (0, validateResources_1.default)(room_schema_1.createRoomNumberSchema), (0, trycatch_handler_1.trycatchHandler)(room_controller_1.createRoomNumber));
router.get("/room_number", deserializeUser_1.verifyAdmin, (0, trycatch_handler_1.trycatchHandler)(room_controller_1.getAllRoomNumber));
router.get("/room_number/id", deserializeUser_1.verifyUser, (0, trycatch_handler_1.trycatchHandler)(room_controller_1.getRoomNumber));
router.put("/room_number/:roomId", deserializeUser_1.verifyAdmin, (0, trycatch_handler_1.trycatchHandler)(room_controller_1.updateRoomNumber));
router.delete("/room_number", deserializeUser_1.verifyAdmin, (0, trycatch_handler_1.trycatchHandler)(room_controller_1.deleteRoomNumber));
//room routes
router.post("/:hotelId/:roomNumberId", deserializeUser_1.verifyAdmin, (0, validateResources_1.default)(room_schema_1.createRoomSchema), (0, trycatch_handler_1.trycatchHandler)(room_controller_1.createRoom));
router.get("/", deserializeUser_1.verifyUser, (0, trycatch_handler_1.trycatchHandler)(room_controller_1.getAllRooms));
router.get("/:roomId", deserializeUser_1.verifyUser, (0, trycatch_handler_1.trycatchHandler)(room_controller_1.getRoom));
router.put("/:roomId", deserializeUser_1.verifyAdmin, (0, trycatch_handler_1.trycatchHandler)(room_controller_1.updateRoom));
router.delete("/:roomId", deserializeUser_1.verifyAdmin, room_controller_1.deleteRoom);
exports.default = router;
