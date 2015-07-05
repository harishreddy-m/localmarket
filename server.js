/*
 * Simple Login Registration Node.js App
 * This app use Express 3, Mongoose 3, Underscore and MongoDB database
 *
 *
 * Author By Equan Pr.
 * http://www.junwatu.com
 *
 * License :  Whatever you want! :D
 */

var express = require("express"),
    session = require('express-session')
    engines = require('consolidate'),
    app = express(),
    mongoose = require('mongoose'),
    dbmessage = '',
    apptitle = 'Dumas';
   
var config = require('config');
var dbConfig = "mongodb://"+config.get('App.dbConfig.user')+":"+config.get('App.dbConfig.password')+"@"+process.env.OPENSHIFT_MONGODB_DB_HOST+":"+process.env.OPENSHIFT_MONGODB_DB_PORT || config.get('App.dbConfig');
var  MongoStore = require ( 'connect-mongo' ) ( session );
console.log(dbConfig);
/*
 * UserSchema
 *
 */
UserSchema = new mongoose.Schema({
    username:'string',
    password:'string',
    email:'string'
});


var db = mongoose.createConnection(dbConfig),
    User = db.model('users', UserSchema);

app.configure(function () {
    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(express.cookieParser());
    app.use(express.session(
        {secret:"secret key", store:new MongoStore({mongooseConnection: db})}));
    app.use(express.static(__dirname + '/app'));

    app.engine('html', engines.underscore);

    /*
     Set views directory. DO NOT set this with the same static directory!.
     */
    app.set('views', __dirname + '/app/views');
    app.set('view engine', 'html');
    app.set('PORT',process.env.OPENSHIFT_NODEJS_PORT || config.get("App.Port"));
    app.set('IP',process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
    

});

/* ==================================
 * MongoDB connection using Mongoose
 */


db.on('connected', function () {
    console.log('Connection success database MongoDB.');
    dbmessage = 'Connection success database MongoDB. database MongoDB.';
});

db.on('error', function () {
    console.error.bind(console, 'Connection error!');
    dbmessage = 'MongoDB error!';
});

app.get("/", function (req, res) {
    res.render('index', {
        title:apptitle,
        message:''
    });
});

// REGISTRATION
app.get('/user/registration', function (req, res) {
    res.render("user/registration", {title:apptitle});
});

// AUTHENTICATION
app.post('/user/login', function (req, res) {

    User.find({username:req.body.username, password:req.body.password}, function (err, user) {

        if (user.length > 0) {
            console.log('User Data:\n');
            console.log(user);

            req.session.loggedIn = true;

            res.render('user/home', {
                user:user[0],
                title:apptitle
            });
        } else {
            console.log('ERROR: Wrong Username or Password');
            res.render('index', {
                title:apptitle,
                message:'<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button><h4>Error!</h4>Wrong username or password</div>'
            });
        }
    });
});

app.param('name', function (req, res, next, name) {
    User.find({username:name}, function (err, user) {
        req.user = user[0];
        console.log(user);
        next();
    });
})

app.get("/user/:name", function (req, res) {
    if (req.session.loggedIn) {
        res.render('user/home', {
            user:req.user,
            title: apptitle
        });
    } else {
        res.render('index', {
            title:apptitle,
            message:''
        });
    }
})

// CREATE USER
app.post("/user/create", function (req, res) {

    var user = new User({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email
    });

    user.save(function (err, user) {
        if (err) res.json(err)
        //res.end('Registration '+user.username +' Ok!');
        req.session.loggedIn = true;
        res.redirect('/user/' + user.username);
    });
});


// LOGOUT
app.get('/logout', function (req, res) {
    // clear user session
    req.session.loggedIn = false;
    res.render('index',{
        title:apptitle,
        message:''});
});

app.listen(app.get('PORT'),app.get('IP'),function(){


console.log('Node-Express-MongoDB Dumas App');
console.log('-------------------------------------------');
console.log("Server Port: " + app.get('PORT'));
console.log("Server IP: " + app.get('IP'));


});
