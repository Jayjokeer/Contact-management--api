const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    number:{
        type:Number,
        unique:true
    }
},{timestamps:true})

module.exports= mongoose.model("contactDB",contactSchema)