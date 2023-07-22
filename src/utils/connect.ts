//import mongoose from "mongoose";
//import config from 'config';
import logger from "./logger"

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

import {Pool} from "pg";
import config from "config"



async function pool (){
    try {
        await new Pool({
            user:config.get("pguser"),
            password:config.get("pgpassword"),
            host:config.get("pghost"),
            port:config.get("pgport"),
            database:config.get("pgdatabase")
        })  
        logger.info('connected to postgres db')
    } catch (error) {
        logger.error('could not connected to db')
        process.exit(1)  
    }
}
export default pool;

//export default connect