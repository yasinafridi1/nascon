const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require("../models/veteran");


function passportInit(passport) {
    passport.use(new LocalStrategy({usernameField:'email'},async(email,password,done)=>{
        // login user
        //check if user exist
        const user = await User.findOne({email:email});
        if(!user){
            return done(null , false , {message:"** No user with this email **"});
        }
        // check password 
        const match = await bcrypt.compare(password , user.password);
        if(match){
            return done(null , user);
        }else{
            return done(null , false , {message : '** Incorrect email or password **'});
        }
    }))
    
    passport.serializeUser(function(user, done) {
        done(null, user._id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}

module.exports = passportInit;