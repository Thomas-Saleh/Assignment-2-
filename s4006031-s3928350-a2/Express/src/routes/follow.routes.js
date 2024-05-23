module.exports = (express, app) => {
    const controller = require("../controllers/followController");
    const router = express.Router();
  
    // Follow a user.
    router.post("/", controller.followUser);
  
    // Unfollow a user.
    router.delete("/", controller.unfollowUser);
  
    // Add routes to server.
    app.use("/api/follow", router);
  };
  