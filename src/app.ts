import express from 'express';
import config from 'config';
import connect from './utils/connect'
import logger from './utils/logger'
import routes from './routes';

const app = express();

const PORT = config.get<number>('port');
app.listen(PORT,async() => {
    logger.info(`server is listening at port ${PORT}`)
    await connect()
    routes(app)
})