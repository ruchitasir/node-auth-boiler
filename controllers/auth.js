//Node Modules/Variables
let router = require('express').Router();
let db = require('../models')
let passport = require('../config/passportConfig')

//Routes
//GET /auth/login
router.get('/login',(req,res)=>{
     res.render('auth/login')
})

// Post /auth/login
router.post('/login',passport.authenticate('local',{
    successFlash: 'Successful Login-Welcome back!',
    successRedirect: '/profile/user',
    failureFlash: 'Invalid credentials',
    failureRedirect: '/auth/login'
}))

// GET /auth/signup- render the signup page
router.get('/signup',(req,res)=>{
    res.render('auth/signup',{data: {}})
})

//POST /auth/signup
router.post('/signup',(req,res,next)=>{
    console.log('data post signup', req.body)
    if(req.body.password !== req.body.password_verify)
    {   // Send the message that why things didnt work or passwords dont match
        req.flash('error','Passwords do not match')

        //Put the user back onto the signup form to try again
        res.render('auth/signup',{data: req.body, alerts: req.flash()})
    }
    else
    {   // Passwords matched, now we'll find/create by the user's email
        db.user.findOrCreate({
            where: { email: req.body.email },
            defaults: req.body
        })
        .then(([user,wasCreated])=>{
            if(wasCreated){
                // Good-this was expected, they are properly new user
                // TODO: Automatically login
                passport.authenticate('local',{
                    successFlash: 'Successful Login-Welcome!',
                    successRedirect: '/profile/user',
                    failureFlash: 'Invalid credentials',
                    failureRedirect: '/auth/login'
                })(req,res,next)
            }
            else{
                //Bad-this person actually already has an account, redirect them to login page
                req.flash('error','Account with this email already exists')
                res.redirect('/auth/login')
            }
        })
        .catch(err=>{
            console.log("Error",err)
            // check for sequelize validations error and make flash messages for them
            if(err.errors){
                err.errors.forEach(e=>{
                    if(e.type == 'Validation error'){
                        req.flash('error',e.message)
                    }
                    console.log("Error: ",e)
                })
                res.render('auth/signup',{data: req.body, alerts: req.flash()})
            }
            else{
                // Generic message for any other issue
                req.flash('error','server error')
                 //Redirect back to sign uo
                res.redirect('/auth/signup')

            }
           
        })
    }
})

router.get('/logout',(req,res)=>{
    //Remove user data from session
    req.logout()

    //Tell them good bye and redirect to another page
    req.flash('success','Bye Bye! 👋 ')
    res.redirect('/')
})

//Export (allow me to include this in another page)
module.exports = router;