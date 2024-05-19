const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {}

  User.init({
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    height: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    weight: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    activity_level: {
      type: DataTypes.ENUM('light', 'moderate', 'active', 'very_active'),
      allowNull: true
    },
    dietary_preferences: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    health_goals: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return User;
};
