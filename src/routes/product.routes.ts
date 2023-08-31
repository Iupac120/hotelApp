import express from "express";
import { createProductHandler, deleteProductHandler, getAllProductHandler, getProductHandler, updateProductHandler } from "../controller/product.controller";
import { verifyAdmin } from "../middleware/deserializeUser";
import { trycatchHandler } from "../utils/trycatch.handler";
import requireUser from "../middleware/requireUser";
import validate from "../middleware/validateResources";
import { createProductSchema } from "../schema/product.schema";
const router = express.Router()

router.post("/",verifyAdmin,validate(createProductSchema),trycatchHandler(createProductHandler))
router.get("/",trycatchHandler(getAllProductHandler))
router.get("/:productId",trycatchHandler(getProductHandler))
router.put("/:productId",verifyAdmin,validate(createProductSchema),trycatchHandler(updateProductHandler))
router.delete("/:productId",verifyAdmin,trycatchHandler(deleteProductHandler))

export default router