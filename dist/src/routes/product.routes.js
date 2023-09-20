"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_js_1 = require("../controller/product.controller.js");
const deserializeUser_js_1 = require("../middleware/deserializeUser.js");
const trycatch_handler_js_1 = require("../utils/trycatch.handler.js");
const validateResources_js_1 = __importDefault(require("../middleware/validateResources.js"));
const product_schema_js_1 = require("../schema/product.schema.js");
const router = express_1.default.Router();
router.post("/", deserializeUser_js_1.verifyAdmin, (0, validateResources_js_1.default)(product_schema_js_1.createProductSchema), (0, trycatch_handler_js_1.trycatchHandler)(product_controller_js_1.createProductHandler));
router.get("/", (0, trycatch_handler_js_1.trycatchHandler)(product_controller_js_1.getAllProductHandler));
router.get("/:productId", (0, trycatch_handler_js_1.trycatchHandler)(product_controller_js_1.getProductHandler));
router.put("/:productId", deserializeUser_js_1.verifyAdmin, (0, validateResources_js_1.default)(product_schema_js_1.createProductSchema), (0, trycatch_handler_js_1.trycatchHandler)(product_controller_js_1.updateProductHandler));
router.delete("/:productId", deserializeUser_js_1.verifyAdmin, (0, trycatch_handler_js_1.trycatchHandler)(product_controller_js_1.deleteProductHandler));
exports.default = router;
