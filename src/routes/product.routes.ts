import express from "express";
import { createProductHandler, deleteProductHandler, getAllProductHandler, getProductHandler, updateProductHandler } from "../controller/product.controller.js";
import { verifyAdmin } from "../middleware/deserializeUser.js";
import { trycatchHandler } from "../utils/trycatch.handler.js";
import requireUser from "../middleware/requireUser.js";
import validate from "../middleware/validateResources.js";
import { createProductSchema } from "../schema/product.schema.js";
const router = express.Router()

router.post("/",verifyAdmin,validate(createProductSchema),trycatchHandler(createProductHandler))
router.get("/",trycatchHandler(getAllProductHandler))
router.get("/:productId",trycatchHandler(getProductHandler))
router.put("/:productId",verifyAdmin,validate(createProductSchema),trycatchHandler(updateProductHandler))
router.delete("/:productId",verifyAdmin,trycatchHandler(deleteProductHandler))

export default router