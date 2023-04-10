const {getAllContacts,getContact,createContact,updateContact,deleteContact} = require("../controllers/contactController")
const  express = require('express')
const router = express.Router()
const {verifyToken,grantAccess} = require('../controllers/userController')



router.get('/contact/allcontacts',grantAccess,getAllContacts)
router.get('/contact/getcontact/:id',grantAccess,getContact)
router.post('/contact/newcontact',grantAccess,createContact)
router.put('/contact/updatecontact/:id',grantAccess,updateContact)
router.delete('/contact/deletecontact/:id',grantAccess,deleteContact)


module.exports = router
            