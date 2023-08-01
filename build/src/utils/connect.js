"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import mongoose from "mongoose";
//import config from 'config';
const logger_1 = __importDefault(require("./logger"));
// async function connect(){
//     const dbUri = config.get<string>('dbUri');
//     try {
//         await  mongoose.connect(dbUri)
//             logger.info('connected to mongoose db')
//     } catch (error) {
//         logger.error('could not connected to db')
//         process.exit(1)  
//     }
// }
const pg_1 = require("pg");
const config_1 = __importDefault(require("config"));
const pool = new pg_1.Pool({
    user: config_1.default.get("pguser"),
    password: config_1.default.get("pgpassword"),
    host: config_1.default.get("pghost"),
    port: config_1.default.get("pgport"),
    database: config_1.default.get("pgdatabase")
});
logger_1.default.info('connected to postgres db');
logger_1.default.error('could not connected to db');
//process.exit(1)  
exports.default = pool;
//export default connect
