"use strict";
//import mongoose from "mongoose";
//import config from 'config';
//import logger from "./logger.js"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
const config_1 = __importDefault(require("config"));
const pool = new Pool({
    user: config_1.default.get("pguser"),
    password: config_1.default.get("pgpassword"),
    host: config_1.default.get("pghost"),
    port: config_1.default.get("pgport"),
    database: config_1.default.get("pgdatabase")
    //connectionString:config.get<string>("conectionString")
});
if (pool) {
    //logger.info('connected to postgres db')
    console.log('connected to postgres db');
}
else {
    //logger.error('could not connected to db')
    console.error('could not connected to db');
    //process.exit(1)  
}
exports.default = pool;
//export default connect
