const express = require('express')
const router = express.Router()
const userDB = require('../model/userDB')
const {register,login,verifyToken,grantAccess}= require('../controllers/userController')


router.get('/user')