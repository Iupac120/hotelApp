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
exports.getUser = exports.getAllUsers = exports.deleteUser = exports.updateUser = void 0;
const user_service_1 = require("../service/user.service");
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = Number(req.params.userId);
        const newUpdate = yield (0, user_service_1.updateUserService)(req.body, userId);
        return res.status(201).json(newUpdate);
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = Number(req.params.userId);
        const delUser = yield (0, user_service_1.deleteUserService)(userId);
        if (!delUser) {
            throw new Error("Failed to delete user");
        }
        return res.status(201).json("Hotel has been deleted");
    });
}
exports.deleteUser = deleteUser;
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield (0, user_service_1.getAllUsersService)();
        console.log("user", users);
        return res.status(200).json(users);
    });
}
exports.getAllUsers = getAllUsers;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = Number(req.params.userId);
            const user = yield (0, user_service_1.getSingleUserService)(userId);
            return res.status(200).json(user);
        }
        catch (e) {
            console.log(e);
            throw new Error(e);
        }
    });
}
exports.getUser = getUser;
