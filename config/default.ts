import dotenv from 'dotenv'
import config from "config"
dotenv.config()

export default {
    port:process.env.PORT,
    dbUri:process.env.MONGOSEURL,
    saltWorkFactor:process.env.SALT,
    accessTokenTtl:process.env.ACCESSMAXAGE,
    refreshTokenTtl:process.env.REFRESHMAXAGE,
    publicKey:process.env.PUBLICKEY,
    privateKey:process.env.PRIVATEKEY
};
