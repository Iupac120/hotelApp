import express from 'express';
import config from 'config';
import connect from './utils/connect'
import logger from './utils/logger';
import expressSession from "express-session";
import authRoute from './routes/auth.routes';
import hotelRoute from './routes/hotel.routes';
import roomRoute from './routes/room.routes';
import usersRoute from './routes/users.routes';
import uploadImageRoute from "./routes/image.routes"
import passportRoute from "./routes/passport.routes"
import cors from 'cors';
import path from "path"
import cookieParser from "cookie-parser";
import "./utils/passport.utils"
import passport from 'passport';
//import deserializeUser from "./middleware/deserializeUser"
import { errorHandler } from './errors/error.handler';


const app = express();
app.use(express.json())
app.use(express.static('public'))
app.use(cors({
    origin:config.get('origin'),
    credentials: true
}))
app.set("view engine","ejs")
app.set("views", path.join(__dirname,"views"))


app.use(cookieParser())
app.use(expressSession({
    secret:'Iupac120',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
//app.use(deserializeUser)//assign middleware to every end point request
app.use("/api/auth",authRoute)
app.use("/api/hotels",hotelRoute)
app.use("/api/rooms",roomRoute)
app.use("/api/users",usersRoute)
app.use("/",uploadImageRoute)
app.use("/",passportRoute)
app.use(errorHandler)
const PORT = process.env.PORT || 5000//config.get<number>('port');
app.listen(PORT,async() => {
    logger.info(`server is listening at port ${PORT}`)
    //await connect()
    //routes(app)
})