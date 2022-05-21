require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const ejsLayouts = require('express-ejs-layouts');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require("connect-mongo");
const app = express();
const passport = require('passport');


const mongodbUrl = process.env.Url;


mongoose.connect(mongodbUrl, {
    // useNewUrlParser: true ,
    // useUnifiedTopology: true,
    // // useCreateIndex:true,
    // // useFindAndModify:false,    
    // useUnifiedTopology:true
});

const connection = mongoose.connection;

mongoose.connection
    .once('open', function () {
      console.log('MongoDB running');
    })
    .on('error', function (err) {
      console.log(err);
    });


    
// session setting
app.use(session({
  secret:process.env.SECRETE,
  resave: false,
  saveUninitialized: true,
  store: MongoDbStore.create({
      mongoUrl: mongodbUrl
  }),
  cookie: {maxAge:1000*60*60*24}  // 2 hours
}))


// flash message
app.use(flash());    



// passport configuration
var passportInit = require('./app/config/passportInit');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// global middleware
app.use((req,res,next)=>{
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});


app.use(express.json());
app.use(express.urlencoded({extended:false}))

  // ejs setting
const viewdir = path.join(__dirname,'./resources/views');
const public = path.join(__dirname,'./public');

app.use(express.static(public));
app.use(ejsLayouts);
app.set("views",viewdir);
app.set("view engine" ,"ejs");

require("./routes/web")(app);

const server = app.listen(8000,()=>{
    console.log(`Listening to port 8000`);
})

