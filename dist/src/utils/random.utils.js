"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = void 0;
async function generateOtp() {
    return `${Math.floor(Math.random() * 9000)}`;
}
exports.generateOtp = generateOtp;
