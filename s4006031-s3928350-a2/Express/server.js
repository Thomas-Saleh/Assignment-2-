const express = require("express");
const cors = require("cors");
const db = require("./src/database");

// Database will be sync'ed in the background.
db.sync();

const app = express();
const PORT = 4000;

// Middleware.
app.use(express.json());
app.use(cors());

// Simple Hello World route.
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Add routes.
require("./src/routes/user.routes.js")(express, app);
require("./src/routes/isLoggedIn.routes.js")(express, app);
require("./src/routes/product.routes.js")(express, app);
require("./src/routes/review.routes.js")(express, app);
require("./src/routes/cart.routes.js")(express, app);
require("./src/routes/follow.routes.js")(express, app);

// Start server.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
