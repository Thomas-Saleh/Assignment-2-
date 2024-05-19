const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class IsLoggedIn extends Model {}

  IsLoggedIn.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    is_logged_in: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    login_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    logout_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'IsLoggedIn',
    timestamps: false
  });

  return IsLoggedIn;
};
