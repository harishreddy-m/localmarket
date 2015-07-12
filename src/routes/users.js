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

// AUTHENTICATION
router.post('/login', function (req, res) {
    console.log(req.body);
    User.findOne({username:req.body.username, password:req.body.password}).exec( function (err, user) {
        if (user.length > 0) {
            console.log('User Data:\n');
            console.log(user);

            req.session.loggedIn = true;

            res.redirect(user[0].username);
            
        } else {
            console.log('ERROR: Wrong Username or Password');
            res.render('index', {
                title:config.get('App.title'),
                message:'<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button><h4>Error!</h4>Wrong username or password</div>'
            });
        }
    });
});

router.param('name', function (req, res, next, name) {
    User.find({username:name}, function (err, user) {
        req.user = user[0];
        console.log(user);
        next();
    });
})

router.get("/:name", function (req, res) {
    if (req.session.loggedIn) {
        res.render('user/home', {
            user:req.user,
            title: config.get('App.title')
        });
    } else {
        res.render('index', {
            title:config.get('App.title'),
            message:''
        });
    }
})

// CREATE USER
router.post("/create", function (req, res) {

    var user = new User({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email
    });

    user.save(function (err, user) {
        if (err) res.json(err)
        //res.end('Registration '+user.username +' Ok!');
        req.session.loggedIn = true;
        res.redirect(user.username);
    });
});




module.exports = router;