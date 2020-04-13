//Node Modules/Variables
let router = require('express').Router();

//Routes
router.get('/login',(req,res)=>{
     res.render('auth/login')
})

router.get('/signup',(req,res)=>{
    res.send('stub- sign up form')
})

//Export (allow me to include this in another page)
module.exports = router;