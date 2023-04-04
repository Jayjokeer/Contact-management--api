require('dotenv').config()
const express = require('express')
const Port = process.env.PORT || 8000
const app = express()
require('./db')
const mongoose= require('mongoose')
const morgan = require('morgan')

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))



app.listen(Port,()=>{
    console.log(`app running on ${Port}`)
})