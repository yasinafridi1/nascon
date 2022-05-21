const User = require("../../../models/veteran");
const mongoose = require('mongoose');
function homeController() {
    return{
        index:(req,res)=>{
             User.findById(req.user._id).then((currUser)=>{
                res.render('./index',{
                    currUser
                })
            }).catch((err)=>{
                console.log(err);
             res.redirect('/');
            })
        }
    }
}

module.exports = homeController;