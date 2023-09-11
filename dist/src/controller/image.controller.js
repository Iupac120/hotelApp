"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.image = exports.uploadImage = exports.upload = void 0;
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, "../images"));
        console.log("cb", path_1.default.join(__dirname, "../images"));
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    }
});
exports.upload = (0, multer_1.default)({ storage: storage });
async function uploadImage(req, res) {
    res.send("image uploaded");
}
exports.uploadImage = uploadImage;
async function image(req, res) {
    console.log("image");
    res.render("upload");
}
exports.image = image;
