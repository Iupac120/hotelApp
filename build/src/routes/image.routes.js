"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const image_controller_1 = require("../controller/image.controller");
const router = express_1.default.Router();
router.post("/upload", image_controller_1.upload.single("image"), image_controller_1.uploadImage); //"image" should have the same name with input name in views/ejs
router.get("/upload", image_controller_1.image);
exports.default = router;
