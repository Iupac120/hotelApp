"use strict";
// import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose"
// import productModel, { ProductDocument,ProductInput } from "../models/product.model"
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.findProduct = exports.findAllProduct = exports.createProduct = void 0;
// export async function createProduct (input:ProductInput){
//     const product = await productModel.create(input)
//     return product
// }
// export async function findProduct (
//     query:FilterQuery<ProductDocument>,
//     options:QueryOptions = {lean: true}
//     ){
//     return productModel.findOne(query,{},options)
// }
// export async function findAndUpdateProduct (
//     query:FilterQuery<ProductDocument>,
//     update:UpdateQuery<ProductDocument>,
//     options:QueryOptions
//     ){
//         return productModel.findOneAndUpdate(query,update,options)
//     }
// export async function deleteProduct (query:FilterQuery<ProductDocument>){
//     return productModel.deleteOne(query)
// }
const error_handler_1 = require("../errors/error.handler");
const product_queries_1 = require("../queries/product.queries");
const connect_1 = __importDefault(require("../utils/connect"));
function createProduct(input, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const adminExist = yield connect_1.default.query(product_queries_1.checkUserQuery, [userId]);
        if (!adminExist.rows.length) {
            throw new error_handler_1.UnAuthorizedError("Only admit can create product");
        }
        console.log("one");
        const product = yield connect_1.default.query(product_queries_1.addProductQuery, [input.title, input.type, input.description, input.price, input.image, userId]);
        console.log("one", product.rows[0]);
        if (!product.rows.length) {
            console.log("one");
            throw new error_handler_1.BadRequestError("product not found");
        }
        console.log("one");
        return product.rows[0];
    });
}
exports.createProduct = createProduct;
function findAllProduct() {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield connect_1.default.query(product_queries_1.findAllProductQuery);
        if (!product.rows.length)
            throw new error_handler_1.NotFoundError("Product not found");
        return product.rows;
    });
}
exports.findAllProduct = findAllProduct;
function findProduct(productId, productTitle) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield connect_1.default.query(product_queries_1.findProductQuery, [productId, productTitle.title]);
        if (!product.rows.length)
            throw new error_handler_1.NotFoundError("Product not found");
        console.log("prodS", product.rows[0]);
        return product.rows[0];
    });
}
exports.findProduct = findProduct;
function updateProduct(userId, productId, input) {
    return __awaiter(this, void 0, void 0, function* () {
        const adminExist = yield connect_1.default.query(product_queries_1.checkUserQuery, [userId]);
        if (!adminExist.rows.length)
            throw new error_handler_1.UnAuthorizedError("Access denied");
        console.log("admi", adminExist.rows[0]);
        const product = yield connect_1.default.query(product_queries_1.findProductIdQuery, [productId]);
        if (!product.rows.length)
            throw new error_handler_1.NotFoundError("Product not found");
        console.log("pro", product.rows[0]);
        const updateProd = yield connect_1.default.query(product_queries_1.updateProductQuery, [
            input.title, input.type, input.description, input.price, input.image, userId, productId
        ]);
        console.log("up", updateProd.rows[0]);
        if (!updateProd.rows.length)
            throw new error_handler_1.BadRequestError("Failed to update");
        return updateProd.rows;
    });
}
exports.updateProduct = updateProduct;
function deleteProduct(userId, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const adminExist = yield connect_1.default.query(product_queries_1.checkUserQuery, [userId]);
        if (!adminExist.rows.length)
            throw new error_handler_1.UnAuthorizedError("Access denied");
        const deleteProd = yield connect_1.default.query(product_queries_1.deleteProductQuery, [productId]);
        return deleteProd.rows[0];
    });
}
exports.deleteProduct = deleteProduct;
