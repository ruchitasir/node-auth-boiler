module.exports =(req,res,next)=>{
    if(req.user){
      // user is logged in
      next() // proceed as planned
    }
    else{
      // user is not logged in
      //send an error message + send them to the login page
      req.flash("error",' Log in to view this page')
      res.redirect('/auth/login')
    }
}