//import mongoose from "mongoose";
//import config from 'config';
//import logger from "./logger.js"

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

import pkg from "pg";
const {Pool} = pkg;
import config from "config"



const pool = new Pool({
            user:config.get("pguser"),
            password:config.get("pgpassword"),
            host:config.get("pghost"),
            port:config.get("pgport"),
            database:config.get("pgdatabase")
            //connectionString:config.get<string>("conectionString")
        })  
if (pool){
    //logger.info('connected to postgres db')
    console.log('connected to postgres db')
}else{
    //logger.error('could not connected to db')
    console.error('could not connected to db')
    //process.exit(1)  
}

export default pool;

//export default connect