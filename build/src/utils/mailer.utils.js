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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const config_1 = __importDefault(require("config"));
const nodemailer_1 = __importDefault(require("nodemailer"));
function sendEmail(subject, message, send_to, sent_from, reply_to) {
    return __awaiter(this, void 0, void 0, function* () {
        //const testAccount = await nodemailer.createTestAccount()
        let transporter = yield nodemailer_1.default.createTransport({
            service: "gmail.com",
            auth: {
                user: config_1.default.get("user"),
                pass: config_1.default.get("pass")
            }
        });
        transporter.verify((err, success) => {
            if (err) {
                console.log(err);
                console.log("error in transporter");
            }
            else {
                console.log('success');
            }
        });
        const options = {
            from: sent_from,
            to: send_to,
            replyTo: reply_to,
            subject: subject,
            html: message
        };
        const info = yield transporter.sendMail(options);
        console.log(`message:${nodemailer_1.default.getTestMessageUrl(info)}`);
    });
}
exports.sendEmail = sendEmail;
