const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Boards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Games, {
        foreignKey: 'game_id',
      });
      this.hasMany(models.Cards, {
        foreignKey: 'board_id',
      });
    }
  }
  Boards.init({
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cards_left: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Boards',
  });
  return Boards;
};
