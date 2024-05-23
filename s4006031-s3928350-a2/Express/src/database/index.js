const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/database");

// Create Sequelize instance.
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

const db = {
  Op: Sequelize.Op,
  sequelize: sequelize,
};

// Include models.
db.User = require("./models/user")(sequelize, DataTypes);
db.IsLoggedIn = require("./models/isLoggedIn")(sequelize, DataTypes);
db.Product = require("./models/product")(sequelize, DataTypes);
db.Review = require("./models/review")(sequelize, DataTypes);
db.Cart = require("./models.cart")(sequelize, DataTypes);
db.Follow = require("./models/follow")(sequelize, DataTypes);

// Set up associations.
db.User.hasMany(db.IsLoggedIn, { foreignKey: 'user_id' });
db.IsLoggedIn.belongsTo(db.User, { foreignKey: 'user_id' });

db.User.hasMany(db.Review, { foreignKey: 'user_id' });
db.Review.belongsTo(db.User, { foreignKey: 'user_id' });

db.Product.hasMany(db.Review, { foreignKey: 'product_id' });
db.Review.belongsTo(db.Product, { foreignKey: 'product_id' });

db.User.hasMany(db.Cart, { foreignKey: 'user_id' });
db.Cart.belongsTo(db.User, { foreignKey: 'user_id' });

db.Product.hasMany(db.Cart, { foreignKey: 'product_id' });
db.Cart.belongsTo(db.Product, { foreignKey: 'product_id' });

db.User.belongsToMany(db.User, { as: 'Followers', through: db.Follow, foreignKey: 'follower_id' });
db.User.belongsToMany(db.User, { as: 'Following', through: db.Follow, foreignKey: 'following_id' });

// Sync and seed data.
db.sync = async () => {
  // Sync schema.
  await sequelize.sync();

  // Uncomment the following line to sync with force if the schema is out of date.
  // await sequelize.sync({ force: true });

  await seedData();
};

async function seedData() {
  const count = await db.User.count();

  // Only seed data if necessary.
  if (count > 0) return;

  const bcrypt = require('bcrypt');

  const hash1 = await bcrypt.hash("password123", 10);
  await db.User.create({ username: "john_doe", email: "john@example.com", password: hash1, first_name: "John", last_name: "Doe" });

  const hash2 = await bcrypt.hash("password456", 10);
  await db.User.create({ username: "jane_doe", email: "jane@example.com", password: hash2, first_name: "Jane", last_name: "Doe" });
}

module.exports = db;
