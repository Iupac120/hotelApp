import mongoose from "mongoose";
import config from 'config';

function connect(){
    const dbUri = config.get<string>('dbUri');
    return mongoose.connect(dbUri,{
        useNewUrlParser:true,
        useUnifiedTopoloy:true
    }).then(() => {
        console.log('connected to db')
    }).catch((err) =>{
        console.error('could not connected to db')
    })
}

export default connect