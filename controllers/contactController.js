const asyncHandler = require('express-async-handler')
const contactDB= require('../model/contactDB')

//getall contacts
const getAllcontacts = asyncHandler(async (req,res)=>{
    const user = await contactDB.find()
    res.status(200).json({users:user})
})

const getContact = asyncHandler(async(req,res)=>{
    const userid= req.params.id
    const user = await contactDB.findById(userid)
    res.status(200).json({user:user})
})

const createContact = asyncHandler(async(req,res)=>{
    const {firstName,lastName,email,number} = req.body
    
        const newContact = new contactDB()
        newContact.firstName =firstName
        newContact.lastName = lastName
        newContact.email= email
        newContact.number = number
    try{
         await newContact.save().then(()=>{
            console.log(newContact)
            res.send("contact saved")
        }).catch((err)=>{console.log(err)})
    }catch(err){
        throw err
    }
    
})

const updateContact= asyncHandler(async(req,res)=>{
    const contactid = req.params.id
    const foundContact = await contactDB.findByIdAndUpdate(contactid,{$set:req.body},{new:true})
    res.send("contact updated")
})

const deleteContact = asyncHandler(async(req,res)=>{
    const contactid = req.params.id
     await contactDB.findByIdAndDelete(contactid)
    res.send("contact deleted")
})


module.exports = {getAllcontacts,getContact,createContact,updateContact,deleteContact}