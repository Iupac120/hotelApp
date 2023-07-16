import pino from 'pino'
import pinoPretty from 'pino-pretty'
import dayjs from 'dayjs'

const log = pino({
    prettifier:pinoPretty,
    base:{
        pid:false
    },
    timestamp:() => `,"time":"${dayjs().format()}"`
})


export default log