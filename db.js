const mongoose= require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGODB_LINK,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log('database connected')
}).catch((err)=>{
    console.log(err)
})