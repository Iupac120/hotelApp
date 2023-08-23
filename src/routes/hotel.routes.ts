import {Router} from "express";
import { createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from "../controller/hotel.controller";
import { trycatchHandler } from "../utils/trycatch.handler";
import validate from "../middleware/validateResources";
import { createHotelSchema, getHotelSchema } from "../schema/hotel.schema";
import { deserializeUser, verifyAdmin, verifyUser } from "../middleware/deserializeUser";

const router = Router()
    //hotels routes
router.post("/",verifyAdmin,validate(createHotelSchema),trycatchHandler(createHotel))
router.get("/",trycatchHandler(getAllHotel))
router.get("/:hotelId",validate(getHotelSchema),trycatchHandler(getHotel))
router.put("/:hotelId",verifyAdmin,validate(getHotelSchema),trycatchHandler(updateHotel))
router.delete("/:hotelId",verifyAdmin,validate(getHotelSchema),trycatchHandler(deleteHotel))
    

export default router