"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = require("../controller/user.controller");
router.get("/", (req, res) => {
    res.send("This is hotel booking app");
});
//user routes
router.get("/", user_controller_1.getAllUsers);
router.get("/:userId", user_controller_1.getUser);
router.put("/:userId", user_controller_1.updateUser);
router.delete("/:userId", user_controller_1.deleteUser);
//router.post("/",validateResource(createUserSchema),createUserHandler)
//router.get("/",requireUser,getUserHandler)
// //sesion routes
// app.post("/api/sessions",validateResource(createSessionSchema),createUserSesionHandler)
// app.get("/api/sessions",requireUser,getUserSesionHandler)
// app.delete("/api/sessions",requireUser,deleteUserSessionHandler)
// //product routes
// app.post("/api/product",[requireUser,validateResource(createProductSchema)],createProductHandler)
// app.get("/api/product",[validateResource(getProductSchema)],getProductHandler)
// app.put("/api/product/productId",[requireUser,validateResource(updateProductSchema)],updateProductHandler)
// app.delete("/api/product/productId",[requireUser,validateResource(deleteProductSchema)],deleteProductHandler)
exports.default = router;
