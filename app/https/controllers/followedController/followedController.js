function followedController() {
    return{
        index:(req,res)=>{
            res.render('./followed');
        }
    }
}


module.exports = followedController;