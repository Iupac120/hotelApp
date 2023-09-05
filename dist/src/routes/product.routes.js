"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controller/product.controller");
const deserializeUser_1 = require("../middleware/deserializeUser");
const trycatch_handler_1 = require("../utils/trycatch.handler");
const validateResources_1 = __importDefault(require("../middleware/validateResources"));
const product_schema_1 = require("../schema/product.schema");
const router = express_1.default.Router();
router.post("/", deserializeUser_1.verifyAdmin, (0, validateResources_1.default)(product_schema_1.createProductSchema), (0, trycatch_handler_1.trycatchHandler)(product_controller_1.createProductHandler));
router.get("/", (0, trycatch_handler_1.trycatchHandler)(product_controller_1.getAllProductHandler));
router.get("/:productId", (0, trycatch_handler_1.trycatchHandler)(product_controller_1.getProductHandler));
router.put("/:productId", deserializeUser_1.verifyAdmin, (0, validateResources_1.default)(product_schema_1.createProductSchema), (0, trycatch_handler_1.trycatchHandler)(product_controller_1.updateProductHandler));
router.delete("/:productId", deserializeUser_1.verifyAdmin, (0, trycatch_handler_1.trycatchHandler)(product_controller_1.deleteProductHandler));
exports.default = router;
