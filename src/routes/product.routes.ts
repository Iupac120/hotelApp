import express from "express";
import { createProductHandler, deleteProductHandler, getAllProductHandler, getProductHandler, updateProductHandler } from "../controller/product.controller";
import { verifyAdmin } from "../middleware/deserializeUser";
const router = express.Router()

router.post("/",verifyAdmin,createProductHandler)
router.get("/",getAllProductHandler)
router.get("/:productId",getProductHandler)
router.put("/:ProductId",updateProductHandler)
router.delete("/:ProductId",deleteProductHandler)

export default router