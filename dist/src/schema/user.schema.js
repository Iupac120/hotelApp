"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpVerifySchema = exports.resetPasswordSchema = exports.userEmailSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        username: (0, zod_1.string)({ required_error: "Name is required" }),
        password: (0, zod_1.string)({ required_error: 'Pasword is required' }).min(6, "Password is too short. The minimum char is 6"),
        passwordConfirmation: (0, zod_1.string)({ required_error: "Password confirmation is required" }),
        email: (0, zod_1.string)({ required_error: 'Email is required' }).email('Not a valid email')
    }).refine(data => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"] //It compares in the confirm to invoke error message
    })
});
exports.userEmailSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({ required_error: 'Email is required' }).email('Not a valid email')
    })
});
exports.resetPasswordSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        password: (0, zod_1.string)({ required_error: 'Pasword is required' }).min(6, "Password is too short. The minimum char is 6"),
        passwordConfirmation: (0, zod_1.string)({ required_error: "Password confirmation is required" }),
        email: (0, zod_1.string)({ required_error: 'Email is required' }).email('Not a valid email')
    }).refine(data => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"] //It compares in the confirm to invoke error message
    })
});
exports.otpVerifySchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        otp: (0, zod_1.string)({ required_error: 'OTP code is required' }),
        email: (0, zod_1.string)({ required_error: 'Email is required' }).email('Not a valid email')
    })
});
