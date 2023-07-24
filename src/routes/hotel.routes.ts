import {Router} from "express";
import { createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from "../controller/hotel.controller";
const router = Router()
    //hotels routes
router.post("/", createHotel)
router.get("/", getAllHotel)
router.get("/:hotelId",getHotel)
router.put("/:hotelId", updateHotel)
router.delete("/:hotelId", deleteHotel)
    

export default router