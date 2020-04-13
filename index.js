/*******************************************
 * REQUIRED
 ******************************************/
// Require needed modules
let express = require('express')
let layouts = require('express-ejs-layouts')
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