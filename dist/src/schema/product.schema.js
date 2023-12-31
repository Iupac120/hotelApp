"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductSchema = exports.getProductSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        //user_id:number({required_error:"user_id is required"}),
        title: (0, zod_1.string)({ required_error: "Title is required" }),
        type: (0, zod_1.string)({ required_error: "Type is required" }),
        description: (0, zod_1.string)({ required_error: "Description is required" }).min(6, "Descrition should be at least 6 character long"),
        price: (0, zod_1.number)({ required_error: "Price is required" }),
        image: (0, zod_1.array)((0, zod_1.string)({ required_error: "Image is required" }))
    })
};
const params = {
    params: (0, zod_1.object)({
        productId: (0, zod_1.string)({ required_error: "Product id is required" })
    })
};
exports.createProductSchema = (0, zod_1.object)({
    ...payload
});
exports.updateProductSchema = (0, zod_1.object)({
    ...payload,
    ...params
});
exports.getProductSchema = (0, zod_1.object)({
    ...params
});
exports.deleteProductSchema = (0, zod_1.object)({
    ...params
});
