module.exports = (express, app) => {
    const controller = require("../controllers/userController");
    const router = express.Router();
  
    // Get all users.
    router.get("/", controller.getAllUsers);
  
    // Get a single user by ID.
    router.get("/:id", controller.getUserById);
  
    // Create a new user.
    router.post("/", controller.createUser);
  
    // Update a user.
    router.put("/:id", controller.updateUser);
  
    // Delete a user.
    router.delete("/:id", controller.deleteUser);
  
    // Add routes to server.
    app.use("/api/users", router);
  };
  