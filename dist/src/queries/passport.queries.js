"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGoogleUser = exports.addFacebookUser = exports.deleteUserById = exports.getUserById = exports.getUsers = void 0;
exports.getUsers = "SELECT * FROM users";
exports.getUserById = "SELECT * FROM users WHERE email = $1";
exports.deleteUserById = "DELETE FROM users WHERE user_id = $1";
exports.addFacebookUser = "INSERT INTO users (first_name,last_name, photo, gender, date_of_birth) VALUES ($1, $2, $3, $4, $5) RETURNING *";
exports.addGoogleUser = "INSERT INTO users (username, email, first_name, photo) VALUES ($1, $2, $3, $4) RETURNING *";
