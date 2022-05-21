const authController = require("../app/https/controllers/authController/authController");
// const followedController = require("../app/https/controllers/followedController/followedController");
const profileController = require("../app/https/controllers/profileController/profileController");
const homeController = require("../app/https/controllers/homeController/homeController");
const chatController = require("../app/https/controllers/chatController/chatController");
const guest = require("../app/https/middleware/guest");
const bind = require("../app/https/middleware/bind");
function initRoutes(app){


    app.get("/",homeController().index);
    // auth routes
    app.get("/login",authController().index);
    app.post("/login",authController().postLogin);
    app.get("/register",authController().createIndex);
    app.post("/register",authController().register);
    app.get("/profile",profileController().index);
    app.get("/chat",chatController().index);
    app.get("/logout",authController().index);
    app.post("/logout",authController().logout);
}

module.exports = initRoutes;