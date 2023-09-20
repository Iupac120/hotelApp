import express from 'express';
//import config from '../config/default.js';
import morgan from 'morgan';
import pool from './utils/connect.js';
import connect from './utils/connect.js'
//import logger from './utils/logger.js';
import expressSession from "express-session";
//import pgSession from "connect-pg-simple"
//import pgPoolSession from "connect-pg-pool"
import authRoute from './routes/auth.routes.js';
import hotelRoute from './routes/hotel.routes.js';
import roomRoute from './routes/room.routes.js';
import usersRoute from './routes/users.routes.js';
import productRoute from './routes/product.routes.js';
import cartRoute from './routes/session.routes.js';
import orderRoute from './routes/order.routes.js';
import uploadImageRoute from "./routes/image.routes.js"
import passportRoute from "./routes/passport.routes.js"
import cors from 'cors';
import path from "path"
import cookieParser from "cookie-parser";
import "./utils/passport.utils.js"
import passport from 'passport';
//import deserializeUser from "./middleware/deserializeUser"
import { errorHandler } from './errors/error.handler.js';


const app = express();
app.use(express.json())
app.use(express.static('public'))
app.use(cors(
//     {
//     origin:config.get('origin') ,
//     credentials: true
// }
))
app.set("view engine","ejs")
app.set("views", path.join(__dirname,"views"))

//  const sessionStore = pgSession(expressSession)
//  const store = new sessionStore({
//      pool,
//      tableName:'session'
//  })
//const sessionStore = pgPoolSession(expressSession)
app.use(cookieParser())
app.use(expressSession({
    secret:'Iupac120',
    resave: true,
    saveUninitialized: true,
    //store:store,
    cookie:{secure:false}//secure should be true on production when using http
}))


//assign session
app.use(function(req,res,next){
    res.locals.session = req.session
    next()
})
app.use(morgan('tiny'))
app.use(passport.initialize())
app.use(passport.session())
//app.use(deserializeUser)//assign middleware to every end point request
app.use("/api/auth",authRoute)
app.use("/api/hotels",hotelRoute)
app.use("/api/rooms",roomRoute)
app.use("/api/users",usersRoute)
app.use("/api/product",productRoute)
app.use("/api/cart",cartRoute)
app.use("/api/order",orderRoute)
app.use("/",uploadImageRoute)
app.use("/",passportRoute)
app.use(errorHandler)
const PORT = process.env.PORT || 5000//config.get<number>('port');
app.listen(PORT,async() => {
    //logger.info(`server is listening at port ${PORT}`)
    //await connect()
    //routes(app)
})