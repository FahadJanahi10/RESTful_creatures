const express = require('express')
const router = express.Router()

// set route for home
router.get('/',(req,res)=>{
    res.render('home')
    
})


module.exports = router