//Node Modules/Variables
let router = require('express').Router();
let db = require('../models')
let moment = require('moment')
let adminLogin = require('../middleware/adminLogin')
let userLogin = require('../middleware/userLogin')

//Custom middleware that is Only applied to this route in this file
//this one applies to the entire router
router.use(userLogin)

//Protect this route from users who are not logged in
router.get('/user',(req,res)=>{
  res.render('profile/user',{ moment })
})

//Get /profile/guest/userId- viewing a user's profile as a guest
router.get('/guest/:id',(req,res)=>{
  db.user.findByPk(req.params.id)
  .then(userProfile=>{
    res.render('profile/guest',{moment, userProfile})
  })
  .catch(err=>{
    console.log(err)
    res.render('error')
  })
})

//Protect this route from users who are not logged in and users who are not admins
// adminLogin will only apply to the route below but router.use(userLogin) will apply to the entire router
router.get('/admin',adminLogin,(req,res)=>{
    db.user.findAll()
    .then(users=>{
      res.render('profile/admin', { moment, users})
    })
    .catch(err=>{
      console.log(err)
      res.render('error')
    })
   
  })
  

//Export (allow me to include this in another page)
module.exports = router;
