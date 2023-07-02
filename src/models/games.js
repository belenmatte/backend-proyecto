const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Games extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Players, {
        foreignKey: 'id',
      });
      this.hasOne(models.Boards, {
        foreignKey: 'id',
      });
    }
  }
  Games.init({
    player1_id: DataTypes.INTEGER,
    player2_id: DataTypes.INTEGER,
    player3_id: DataTypes.INTEGER,
    winner: DataTypes.INTEGER,
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    number_players: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    playing: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Games',
  });
  return Games;
};
