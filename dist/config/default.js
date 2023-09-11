"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    //dbUri:process.env.DBURI,
    pguser: process.env.PGUSER,
    pgpassword: process.env.PGPASSWORD,
    pghost: process.env.PGHOST,
    pgport: process.env.PGPORT,
    pgdatabase: process.env.PGDATABASE,
    //port:process.env.PORT || 5000,
    //origin:process.env.ORIGIN,
    //localhost:process.env.LOCALHOST,
    url: process.env.URL,
    path: process.env.PATH,
    saltWorkFactor: 10,
    accessTokenTtl: process.env.ACCESSTOKENTTL,
    refreshTokenTtl: process.env.REFRESHTOKENTTL,
    googleClientId: process.env.GOOGLECLIENTID,
    googleClientSecret: process.env.GOOGLECLIENTSECRET,
    googleOauthRedirectUrl: process.env.GOOGLEOAUTHREDIRECTURL,
    facebookClientId: process.env.FACEBOOKCLIENTID,
    facebookClientSecret: process.env.FACEBOOKCLIENTSECRET,
    facebookOauthRedirectUrl: process.env.FACEBOOKREDIRECTURL,
    privateKey: process.env.PRIVATEKEY,
    publicKey: process.env.PUBLICKEY,
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
    emailedFrom: process.env.EmailedFrom,
    stripe: process.env.STRIPE,
    connectionString: process.env.databaseString
};
