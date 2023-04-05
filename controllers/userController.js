const userDB = require('../model/userDB')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')


const register = asyncHandler(async(req,res)=>{
    const {username,password,email} = req.body
    if(!username || !password ||!email) res.json({message:"please input all fields"});
    const newUser = new userDB()
    //hash the password
    const hashedpassword = await bcrypt.hash(password,10)

    newUser.username = username
    newUser.email = email
    newUser.password = hashedpassword
    //save the user
    await newUser.save().then(()=>{console.log(newUser)}).catch((err)=>{console.log(err)})
})

const login = asyncHandler(async(req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password) res.json({message:"please input all fields"});
    //query databse for the user
    const foundUser = await userDB.findOne(email)
    if(!foundUser) res.json({message:"user not found in the database"})

    const pwdCheck= await bcrypt.compare(password,foundUser.password)
    if(!pwdCheck) res.json({message:'email or password is not correct'})
    
    const accessToken = jwt.sign(foundUser.email,process.env.ACCESS_TOKEN)
    next()

})

const verifyToken = (req,res,next)=>{
    const bearerHeader = req.headers["Authorization"]
    const bearerToken = bearerHeader.split(' ')[1]
    const verifiedToken = jwt.verify(bearerToken,process.env.ACCESS_TOKEN,(err,user))
    if(err) console.log(err) 
    console.log(user)
    req.user= user
    next()
}

const grantAccess= async(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.isAdmin=== true){
            next()
        }else(console.log('you are not an admin'))
    })
}

module.exports = {register,login,verifyToken,grantAccess}