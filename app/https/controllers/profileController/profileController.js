function profileController() {
    return{
        index:(req,res)=>{
            res.render('./profile');
        }
    }
}


module.exports = profileController;