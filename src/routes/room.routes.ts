import express from "express";
import { createRoom, createRoomNumber, deleteRoom, deleteRoomNumber, getAllRoomNumber, getAllRooms, getRoom, getRoomNumber, updateRoom, updateRoomNumber } from "../controller/room.controller";
import { trycatchHandler } from "../utils/trycatch.handler";
const router = express.Router()
    //Room number routes
router.post("/room_number", trycatchHandler(createRoomNumber))
router.get("/room_number", trycatchHandler(getAllRoomNumber))
router.get("/room_number/id", trycatchHandler(getRoomNumber))
router.put("/room_number/:roomId", trycatchHandler(updateRoomNumber))
router.delete("/room_number", trycatchHandler(deleteRoomNumber))

        //room routes
router.post("/:hotelId/:roomNumberId", trycatchHandler(createRoom))
router.get("/", trycatchHandler(getAllRooms))
router.get("/:roomId",trycatchHandler(getRoom))
router.put("/:roomId", trycatchHandler(updateRoom))
router.delete("/:roomId", deleteRoom)

export default router