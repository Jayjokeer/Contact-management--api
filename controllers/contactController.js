const asyncHandler = require('express-async-handler')
const contactDB= require('../model/contactDB')

//getall contacts
const getAllContacts = asyncHandler(async (req,res)=>{
    try{
        const contact = await contactDB.find()
        res.status(200).json({users:contact})
    }catch(error){
        console.log(error)
    }
})
//get one contact
const getContact = asyncHandler(async(req,res)=>{
    const userid= req.params._id
    try{
        const contact = await contactDB.findOne(userid)
        res.send(contact)
    }catch(error){
        console.log(error)
    }
})
//create new contact
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
//update a contact
const updateContact= asyncHandler(async(req,res)=>{
    const contactid = req.params.id
    const foundContact = await contactDB.findByIdAndUpdate(contactid,{$set:req.body},{new:true})
    res.send("contact updated")
})
//delete a contact
const deleteContact = asyncHandler(async(req,res)=>{
    const contactid = req.params.id
     await contactDB.findByIdAndRemove(contactid)
    res.send("contact deleted")
})


module.exports = {getAllContacts,getContact,createContact,updateContact,deleteContact}