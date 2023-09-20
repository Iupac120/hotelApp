import express from "express"
import { image, uploadImage , upload} from "../controller/image.controller.js"
const router = express.Router()

router.post("/upload", upload.single("image"),uploadImage)//"image" should have the same name with input name in views/ejs
router.get("/upload",image)

export default router