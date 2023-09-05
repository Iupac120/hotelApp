"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductHandler = exports.updateProductHandler = exports.getProductHandler = exports.getAllProductHandler = exports.createProductHandler = void 0;
// import { createProduct, deleteProduct, findAndUpdateProduct, findProduct } from '../service/product.service';
// export async function createProductHandler (req:Request<{},{},CreateProductInput['body']>,res:Response){
// const userId = res.locals.user._id
// const body = req.body
// const product =  await createProduct({...body,user:userId})
// return res.send(product)
// }
// export async function updateProductHandler (req:Request<UpdateProductInput['params']>,res:Response){
//     const userId =  res.locals.user._id
//     const update = req.body
//     const productId = req.params.productId
//     let product = await findProduct({productId})
//     if(!product){
//         res.sendStatus(404)
//     }
//     if(String(product.user) !== userId){
//         res.sendStatus(403)
//     }
//     const updatedProduct = await findAndUpdateProduct({productId},update,{
//         new: true
//     })
//     return res.send(updatedProduct)
// }
// export async function getProductHandler (req:Request<GetProductInput['params']>,res:Response){
//     const productId = req.params.productId
//     const product = await findProduct({productId})
//     if(!product){
//         return res.sendStatus(404)
//     }
//     return res.send(product)
// }
// export async function deleteProductHandler (req:Request<DeleteProductInput['params']>,res:Response){
//     const userId =  res.locals.user._id
//     const productId = req.params.productId
//     const product = await findProduct({productId})
//     if(!product){
//         res.sendStatus(404)
//     }
//     if(String(product.user) !== userId){//cast product.user to a string because userid a string while product.user a mongoose objectid
//         res.sendStatus(403)
//     }
//     await deleteProduct({productId})
//     return res.sendStatus(200) 
// }
const product_service_1 = require("../service/product.service");
const error_handler_1 = require("../errors/error.handler");
function createProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user.id;
        console.log("userId", userId);
        const body = req.body;
        const product = yield (0, product_service_1.createProduct)(body, userId);
        return res.status(201).json(product);
    });
}
exports.createProductHandler = createProductHandler;
function getAllProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield (0, product_service_1.findAllProduct)();
        if (!product) {
            throw new error_handler_1.NotFoundError("Product not found");
        }
        return res.status(200).json(product);
    });
}
exports.getAllProductHandler = getAllProductHandler;
function getProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = Number(req.params.productId);
        const body = req.body;
        const product = yield (0, product_service_1.findProduct)(productId, body);
        console.log("productC", product);
        if (!product) {
            throw new error_handler_1.NotFoundError("Product not found");
        }
        return res.status(200).json(product);
    });
}
exports.getProductHandler = getProductHandler;
function updateProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = Number(res.locals.user.id);
        const productId = Number(req.params.productId);
        const body = req.body;
        const product = yield (0, product_service_1.updateProduct)(userId, productId, body);
        if (!product) {
            throw new error_handler_1.NotFoundError("Product not found");
        }
        return res.status(201).json(product);
    });
}
exports.updateProductHandler = updateProductHandler;
function deleteProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = Number(res.locals.user.id);
        const productId = Number(req.params.productId);
        const product = yield (0, product_service_1.deleteProduct)(userId, productId);
        return res.status(200).json({ message: "product deleted" });
    });
}
exports.deleteProductHandler = deleteProductHandler;
