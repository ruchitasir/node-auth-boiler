// Require environment variables
require('dotenv').config()

// Require node modules
let passport = require('passport')

//Require any Strategies (AKA types of auth) we want to use
let LocalStrategy = require('passport-local').Strategy

//Import a reference to our database
let db = require('../models')

// Serlialization and Deserialization functions
//these are for passport to use in order to store/lookup the user info
//SERIALIZE: Reduce a user object to just its id field
passport.serializeUser((user,done)=>{
    // call the callback function with the user id as an argument
    // done(error,id)-return pass a null if no error
    done(null,user.id)
})


// DESERIALIZE: Reverse the process of the serialize function
// In other words, take a user's id and return the full user object
passport.deserializeUser((id,done)=>{
    db.user.findByPk(id)
    .then(user=>{
        done(null,user)
    })
    .catch(done)
})


//LOCAL STRATEGY: Using a database that we manage ourselves(not OAuth)
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},(email,password,done)=>{
    // Try looking up the user by their email
    db.user.findOne({
        where: {email:email}
    })
    .then(foundUser=>{
        // check if there is a user, if yes then check their password
        if(foundUser && foundUser.validPassword(password)){
            // GOOD -provided right credentials for logging in
            done(null,foundUser)
        }
        else{
            // BAD- user does not exist or password was bad
            done(null,null)
        }        
    })
    .catch(done)
}))


// Make sure we can include this file into other files
module.exports = passport;