import dotenv from 'dotenv'
dotenv.config()

export default {
    port: process.env.PORT,
    dbUri:process.env.MONGOSEURL,
    saltWorkFactor:process.env.SALT
};