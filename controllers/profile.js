//Node Modules/Variables
let router = require('express').Router();
let db = require('../models')

router.get('/user',(req,res)=>{
  res.render('profile/user')
})

router.get('/admin',(req,res)=>{
    res.render('profile/admin')
  })
  

//Export (allow me to include this in another page)
module.exports = router;
