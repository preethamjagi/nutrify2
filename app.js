const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const User=require("./models/User"); 
const path = require('path')
const app = express();
const Mongostore  = require('connect-mongo')


// Passport Config
require('./config/passport')(passport);

//DB config
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('Mongo Connected to database'))
.catch(err=>console.log(err));


// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    store: Mongostore.create({
      mongoUrl:db,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true}
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/meals', require('./routes/meals.js'));

// //Admin Routes
// app.use(bodyParser.json());
// app.use('/meals', require('./routes/meals.js'));
// app.use(adminBro.options.rootPath, router)


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));