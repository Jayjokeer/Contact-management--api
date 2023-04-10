const userDB = require('../model/userDB')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


const register = asyncHandler(async(req,res)=>{
    const {username,password,email} = req.body
    if(!username || !password ||!email) res.json({message:"please input all fields"});
   try{ const newUser = new userDB()
    //hash the password
    const hashedpassword = await bcrypt.hash(password,10)

    newUser.username = username
    newUser.email = email
    newUser.password = hashedpassword
    //save the user
    await newUser.save().then(()=>{console.log(newUser)}).catch((err)=>{console.log(err)})
    res.send("user saved")
    }catch(err){res.send(err)
    console.log(err)}
})

const login = asyncHandler(async(req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password) res.json({message:"please input all fields"});
    //query databse for the user
    const foundUser = await userDB.findOne({email})
    if(!foundUser) res.json({message:"user not found in the database"})

    const pwdCheck= await bcrypt.compare(password,foundUser.password)
    if(!pwdCheck){ res.json({message:'email or password is not correct'})}
    else{
        const accessToken = jwt.sign({user:{
        username:foundUser.username,email:foundUser.email,id:foundUser.id,isAdmin:foundUser.isAdmin}},process.env.ACCESS_TOKEN)
        res.send(accessToken)
        
    }
 
})

const currentUser= asyncHandler(async(req,res)=>{
    res.send('this is the currrent user')
})

const verifyToken = async(req,res,next)=>{
    let bearerToken =req.headers.authorization && req.headers.authorization.split(" ")[1]
    if(!bearerToken) console.log("No token unauthorized") ;
    try{
        jwt.verify(bearerToken,process.env.ACCESS_TOKEN,(err,user)=>{
            if(!err){
                req.user= user
                next()
            }else{
                res.send(err)
            }
        })
       
    }catch(err){
        res.send(err)
    }
    
}

const grantAccess= async(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else {
            console.log('you are not an admin') 
            res.status(403).send('You are not an admin')
        }
    })
}

module.exports = {register,login,currentUser,verifyToken,grantAccess}