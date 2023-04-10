const express = require('express')
const router = express.Router()
const userDB = require('../model/userDB')
const {register,login,currentUser }= require('../controllers/userController')


router.get('/login',(req,res)=>{
    res.send('log in')
})

router.post('/login',login,(req,res,error)=>{
    if(error) console.log(error)
})

router.get('/register',(req,res)=>{
    res.send('register as a new user')
})

router.post('/register',register)
router.get('/currentuser',currentUser)
module.exports = router