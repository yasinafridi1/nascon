const User = require("../../../models/veteran");
const mongoose = require("mongoose");
function chatController(){
    return{
        index:(req,res)=>{
            res.render("./chat");
        }
    }
}


module.exports = chatController;