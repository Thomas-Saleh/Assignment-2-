const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config");

const db = {
  Op: Sequelize.Op,
};

// Create Sequelize instance.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

// Include models.
db.user = require("./user")(db.sequelize, DataTypes);
db.isLoggedIn = require("./isLoggedIn")(db.sequelize, DataTypes);
db.product = require("./product")(db.sequelize, DataTypes);
db.review = require("./review")(db.sequelize, DataTypes);
db.cart = require("./cart")(db.sequelize, DataTypes);
db.follow = require("./follow")(db.sequelize, DataTypes);

// Set up associations.
db.user.hasMany(db.isLoggedIn, { foreignKey: 'user_id' });
db.isLoggedIn.belongsTo(db.user, { foreignKey: 'user_id' });

db.user.hasMany(db.review, { foreignKey: 'user_id' });
db.review.belongsTo(db.user, { foreignKey: 'user_id' });

db.product.hasMany(db.review, { foreignKey: 'product_id' });
db.review.belongsTo(db.product, { foreignKey: 'product_id' });

db.user.hasMany(db.cart, { foreignKey: 'user_id' });
db.cart.belongsTo(db.user, { foreignKey: 'user_id' });

db.product.hasMany(db.cart, { foreignKey: 'product_id' });
db.cart.belongsTo(db.product, { foreignKey: 'product_id' });

db.user.belongsToMany(db.user, { as: 'Followers', through: db.follow, foreignKey: 'follower_id' });
db.user.belongsToMany(db.user, { as: 'Following', through: db.follow, foreignKey: 'following_id' });

// Sync and seed data.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();
};

module.exports = db;
