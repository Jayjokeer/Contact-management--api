require('dotenv').config()
const express = require('express')
const Port = process.env.PORT || 8000
const app = express()
require('./config/db')
const mongoose= require('mongoose')
const morgan = require('morgan')
const errorHandler = require('./middlewares/errorHandler')

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(errorHandler)

//routes
app.use('/', require('./routes/contactRoute'))


app.listen(Port,()=>{
    console.log(`app running on ${Port}`)
})