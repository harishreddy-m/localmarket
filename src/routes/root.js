
var express = require('express');
var router = express.Router();
var config = require('config');

router.get("/", function (req, res) {
    if (req.session.loggedIn) {
        res.redirect('/home')
    }else{
        res.render('index', {
            title:config.get('App.title'),
            message:'Welcome!!'
        });
    }
});

router.get("/home", function (req, res) {
    if (req.session.loggedIn) {
        res.render('user/home', {
            user:req.session.user,
            title: config.get('App.title')
        });
    } else {
        res.render('index', {
            title:config.get('App.title'),
            message:'Welcome!!'
        });
    }
})



// LOGOUT
router.get('/logout', function (req, res) {
    // clear user session
    req.session.loggedIn = false;
    res.render('index',{
        title:config.get('App.title'),
        message:'Byee!!'});
});


module.exports = router;

