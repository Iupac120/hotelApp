"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const config_1 = __importDefault(require("config"));
const nodemailer_1 = __importDefault(require("nodemailer"));
async function sendEmail(subject, message, send_to, sent_from, reply_to) {
    //const testAccount = await nodemailer.createTestAccount()
    let transporter = await nodemailer_1.default.createTransport({
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
    const info = await transporter.sendMail(options);
    console.log(`message:${nodemailer_1.default.getTestMessageUrl(info)}`);
}
exports.sendEmail = sendEmail;
