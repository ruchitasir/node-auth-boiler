//Node Modules/Variables
let router = require('express').Router();

//Routes
//GET /auth/login
router.get('/login',(req,res)=>{
     res.render('auth/login')
})

// Post /auth/login
router.post('/login',(req,res)=>{
    console.log('data', req.body)
    res.send("Hello post")
})
// GET /auth/signup- render the signup page
router.get('/signup',(req,res)=>{
    res.render('auth/signup',{data: {}})
})

//POST /auth/signup
router.post('/signup',(req,res)=>{
    console.log('data', req.body)
    if(req.body.password !== req.body.password_verify)
    {
        // Send the message that passwords dont match
        //Put the user back onto the signup form to try again
        res.render('auth/signup',{data: req.body})
    }
    else{
    res.send("Signup successful")
    }
})
//Export (allow me to include this in another page)
module.exports = router;