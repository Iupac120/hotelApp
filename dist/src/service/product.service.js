"use strict";
// import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose"
// import productModel, { ProductDocument,ProductInput } from "../models/product.model"
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
async function createProduct(input, userId) {
    const adminExist = await connect_1.default.query(product_queries_1.checkUserQuery, [userId]);
    if (!adminExist.rows.length) {
        throw new error_handler_1.UnAuthorizedError("Only admit can create product");
    }
    console.log("one");
    const product = await connect_1.default.query(product_queries_1.addProductQuery, [input.title, input.type, input.description, input.price, input.image, userId]);
    console.log("one", product.rows[0]);
    if (!product.rows.length) {
        console.log("one");
        throw new error_handler_1.BadRequestError("product not found");
    }
    console.log("one");
    return product.rows[0];
}
exports.createProduct = createProduct;
async function findAllProduct() {
    const product = await connect_1.default.query(product_queries_1.findAllProductQuery);
    if (!product.rows.length)
        throw new error_handler_1.NotFoundError("Product not found");
    return product.rows;
}
exports.findAllProduct = findAllProduct;
async function findProduct(productId, productTitle) {
    const product = await connect_1.default.query(product_queries_1.findProductQuery, [productId, productTitle.title]);
    if (!product.rows.length)
        throw new error_handler_1.NotFoundError("Product not found");
    console.log("prodS", product.rows[0]);
    return product.rows[0];
}
exports.findProduct = findProduct;
async function updateProduct(userId, productId, input) {
    const adminExist = await connect_1.default.query(product_queries_1.checkUserQuery, [userId]);
    if (!adminExist.rows.length)
        throw new error_handler_1.UnAuthorizedError("Access denied");
    console.log("admi", adminExist.rows[0]);
    const product = await connect_1.default.query(product_queries_1.findProductIdQuery, [productId]);
    if (!product.rows.length)
        throw new error_handler_1.NotFoundError("Product not found");
    console.log("pro", product.rows[0]);
    const updateProd = await connect_1.default.query(product_queries_1.updateProductQuery, [
        input.title, input.type, input.description, input.price, input.image, userId, productId
    ]);
    console.log("up", updateProd.rows[0]);
    if (!updateProd.rows.length)
        throw new error_handler_1.BadRequestError("Failed to update");
    return updateProd.rows;
}
exports.updateProduct = updateProduct;
async function deleteProduct(userId, productId) {
    const adminExist = await connect_1.default.query(product_queries_1.checkUserQuery, [userId]);
    if (!adminExist.rows.length)
        throw new error_handler_1.UnAuthorizedError("Access denied");
    const deleteProd = await connect_1.default.query(product_queries_1.deleteProductQuery, [productId]);
    return deleteProd.rows[0];
}
exports.deleteProduct = deleteProduct;
