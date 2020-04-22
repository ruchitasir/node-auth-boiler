/*******************************************
 * NODE-MODULES
 ******************************************/
// Require needed modules
let express = require('express')
let flash= require('connect-flash')
let layouts = require('express-ejs-layouts')
let session = require('express-session')

// creata an app instance
let app = express()
/*******************************************
 * SETTINGS/MIDDLEWARE
 ******************************************/

// set template language to ejs
app.set('view engine','ejs')
//Tell express to use the layout modules
app.use(layouts)
// Set up static folder with 
app.use(express.static('static'))

// Decrypt variables coming in via POST routes from forms
app.use(express.urlencoded({extended:false}))

//set up sessions
app.use(session({
    secret: 'any string is fine',
    resave: false,
    saveUninitialized: true
}))

//set up connect-flash for the flash alert messages
//it depends on session, order matters so session has to be declared first
// before flash is used
app.use(flash())

//custom middleware which makes certain variables
// available to EJS pages through locals
app.use((req,res,next)=>{
    res.locals.alerts = req.flash()
    next()
})

/*******************************************
 * ROUTES
 ******************************************/
//Controllers
app.use('/auth',require('./controllers/auth'))

// create a home page
app.get('/',(req,res)=>{
    res.render('home')
})

 // create a wildcard route
app.get('*',(req,res)=>{
    //res.send("This matches literally anything, great spot for an error page")
    res.render('error');
})

/*******************************************
 * LISTEN
 ******************************************/
app.listen(3000)