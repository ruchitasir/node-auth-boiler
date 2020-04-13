// Require needed modules
let express = require('express')
let layouts = require('express-ejs-layouts')

// creata an app instance
let app = express()

// set template language to ejs
app.set('view engine','ejs')

//Tell express to use the layout modules
app.use(layouts)

// Set up static folder with 
app.use(express.static('static'))

app.get('*',(req,res)=>{
    //res.send("This matches literally anything, great spot for an error page")
    res.render('error');
})

app.listen(3000)