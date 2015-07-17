var express = require('express');
var router = express.Router();
var User = require('../models/user');
var config = require('config');


/*
Models
*/



// REGISTRATION
router.get('/registration', function (req, res) {
   res.render("user/registration", {title:config.get('App.title')});
});

router.get('/role', function (req, res) {
  if(req.session.user.isCustomer)
                res.send("customer");//);
            else
                res.send("admin");
});




// AUTHENTICATION
router.post('/login', function (req, res) {
    
    User.findOne({username:req.body.username, password:req.body.password}).exec( function (err, user) {
        if (user) {

            req.session.loggedIn = true;
            req.session.user = user;
            if(user.isCustomer)
                res.redirect("/#customer/"+user.username);//);
            else
                res.redirect("/#admin/");
            
        } else {
            console.log('ERROR: Wrong Username or Password');
            res.render('index', {
                title:config.get('App.title'),
                message:'<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button><h4>Error!</h4>Wrong username or password</div>'
            });
        }
    });
});



// CREATE USER
router.post("/create", function (req, res) {
 console.log(req.body);
 var user = new User({
    username:req.body.username,
    password:req.body.password,
    email:req.body.email,
    isCustomer:req.body.isCustomer=='on'
});

 user.save(function (err, user) {
    if (err) res.json(err)
        //res.end('Registration '+user.username +' Ok!');
    res.redirect("/home");
});
});




module.exports = router;