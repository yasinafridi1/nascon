// check if user is admin or customer
function bindUser(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/login');

}
module.exports = bindUser;