const {getAllcontacts,getContact,createContact,updateContact,deleteContact} = require("../controllers/contactController")
const  express = require('express')
const router = express.Router()



router.get('/contact/allcontacts',getAllcontacts)
router.get('/contact/getcontact/:id',getContact)
router.post('/contact/newcontact',createContact)
router.put('/contact/updatecontact/:id',updateContact)
router.delete('/contact/deletecontact/:id',deleteContact)


module.exports = router
            