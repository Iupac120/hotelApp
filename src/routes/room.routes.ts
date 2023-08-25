import express from "express";
import { createRoom, createRoomNumber, deleteRoom, deleteRoomNumber, getAllRoomNumber, getAllRooms, getRoom, getRoomNumber, updateRoom, updateRoomNumber } from "../controller/room.controller";
import { trycatchHandler } from "../utils/trycatch.handler";
import { verifyAdmin, verifyUser } from "../middleware/deserializeUser";
import validate from "../middleware/validateResources";
import { createRoomNumberSchema, createRoomSchema } from "../schema/room.schema";
const router = express.Router()
    //Room number routes
router.post("/room_number",verifyAdmin,validate(createRoomNumberSchema),trycatchHandler(createRoomNumber))
router.get("/room_number",verifyAdmin,trycatchHandler(getAllRoomNumber))
router.get("/room_number/id",verifyUser,trycatchHandler(getRoomNumber))
router.put("/room_number/:roomId",verifyAdmin,trycatchHandler(updateRoomNumber))
router.delete("/room_number",verifyAdmin,trycatchHandler(deleteRoomNumber))

        //room routes
router.post("/:hotelId/:roomNumberId",verifyAdmin,validate(createRoomSchema),trycatchHandler(createRoom))
router.get("/",verifyUser,trycatchHandler(getAllRooms))
router.get("/:roomId",verifyUser,trycatchHandler(getRoom))
router.put("/:roomId",verifyAdmin,trycatchHandler(updateRoom))
router.delete("/:roomId",verifyAdmin,deleteRoom)

export default router