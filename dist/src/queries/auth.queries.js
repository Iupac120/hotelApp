"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserSession = exports.addUser = exports.checkEmail = void 0;
exports.checkEmail = "SELECT * FROM users  WHERE email = $1";
exports.addUser = "INSERT INTO users (username, email, password,token,token_expires_at) VALUES($1, $2, $3, $4, $5) RETURNING *";
exports.findUserSession = "SELECT * FROM users WHERE user_id = $1";
