import express from 'express';
import config from 'config';
import connect from './utils/connect'
import logger from './utils/logger'
import routes from './routes';
import cors from 'cors';
import path from "path"
import cookieParser from "cookie-parser"
import deserializeUser from "./middleware/deserializeUser"

const app = express();
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))
app.use(cors({
    origin:config.get('origin'),
    credentials: true
}))
app.use(cookieParser())
app.use(deserializeUser)//assign middleware to every end point request
const PORT = config.get<number>('port');
app.listen(PORT,async() => {
    logger.info(`server is listening at port ${PORT}`)
    await connect()
    routes(app)
})