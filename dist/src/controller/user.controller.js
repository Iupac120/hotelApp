"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getAllUsers = exports.deleteUser = exports.updateUser = void 0;
const user_service_js_1 = require("../service/user.service.js");
async function updateUser(req, res) {
    const userId = Number(req.params.userId);
    const newUpdate = await (0, user_service_js_1.updateUserService)(req.body, userId);
    return res.status(201).json(newUpdate);
}
exports.updateUser = updateUser;
async function deleteUser(req, res) {
    const userId = Number(req.params.userId);
    const delUser = await (0, user_service_js_1.deleteUserService)(userId);
    if (!delUser) {
        throw new Error("Failed to delete user");
    }
    return res.status(201).json("Hotel has been deleted");
}
exports.deleteUser = deleteUser;
async function getAllUsers(req, res) {
    const users = await (0, user_service_js_1.getAllUsersService)();
    console.log("user", users);
    return res.status(200).json(users);
}
exports.getAllUsers = getAllUsers;
async function getUser(req, res) {
    try {
        const userId = Number(req.params.userId);
        const user = await (0, user_service_js_1.getSingleUserService)(userId);
        return res.status(200).json(user);
    }
    catch (e) {
        console.log(e);
        throw new Error(e);
    }
}
exports.getUser = getUser;
