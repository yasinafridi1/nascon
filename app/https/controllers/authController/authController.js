const Veteren = require('../../../models/veteran');
const bcrypt = require("bcrypt");
const passport = require('passport');


function authControllers() {
    return{
        index:(req,res)=>{
            res.render("./auth/login");
        },
        logout:(req,res)=>{
            req.logout();
            return res.redirect('/login');
        },
        postLogin:(req,res,next)=>{
            passport.authenticate('local', function(err, user, info) {
                if (err) { 
                    req.flash('error',info.message);
                    return next(err); 
                }
                if (!user) {
                    req.flash('error',info.message);
                     return res.redirect('/login'); 
                    }
                req.logIn(user, function(err) {
                  if (err) { 
                    req.flash('error',info.message);
                      return next(err); 
                    }
                    return res.redirect('/');
                });
              })(req, res, next);
        },
        createIndex:(req,res)=>{
            res.render("./auth/register");
        },
        register:async(req,res)=>{
           try {
            const {fullName,fatherName,email,pNo,dob,rank,epassword,cpassword} = req.body;
            // console.log(fullName+ fatherName+ epassword+cpassword);
            if(epassword !== cpassword){
                req.flash("error","** Password not matching **");
                return res.redirect("/register");
            }
            Veteren.exists({email},(err,result)=>{
                if(result){
                    req.flash('error','** Email already exist **');
                    return res.redirect('/register');
                }
            })
            const hashedPassword = await bcrypt.hash(epassword,10);
            const newVeteran = new Veteren({
                fullName,
                fatherName,
                email,
                phone:pNo,
                dateofbirth:dob,
                password:hashedPassword,
                rank
            })

            const result = await newVeteran.save();
            if(result){
                console.log(result);
                return res.redirect("/login");
            }else{
                console.log(err);
                req.flash('error','** Somet went wrong **');
                return res.redirect('/register');
            }

           } catch (err) {
               console.log(err);
               req.flash('error','** Something went wrong **');
               return res.redirect('/register');
           }
            
        }
       
    }
}

module.exports = authControllers;