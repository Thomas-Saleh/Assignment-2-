const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Follow extends Model {}

  Follow.init({
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    following_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Follow',
    timestamps: false,
    primaryKey: true,
    indexes: [
      {
        unique: true,
        fields: ['follower_id', 'following_id']
      }
    ]
  });

  return Follow;
};
