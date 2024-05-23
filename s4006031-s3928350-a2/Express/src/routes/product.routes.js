module.exports = (express, app) => {
    const controller = require("../controllers/productController");
    const router = express.Router();
  
    // Get all products.
    router.get("/", controller.getAllProducts);
  
    // Get a single product by ID.
    router.get("/:id", controller.getProductById);
  
    // Add a new product (if needed).
    router.post("/", controller.createProduct);
  
    // Update an existing product (if needed).
    router.put("/:id", controller.updateProduct);
  
    // Delete a product (if needed).
    router.delete("/:id", controller.deleteProduct);
  
    // Add routes to server.
    app.use("/api/products", router);
  };
  