const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class RoomInfra extends Model {
  static init(sequelize) {
    return super.init(
      {
        sort: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: "RoomInfra",
        tableName: "roomInfra",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.RoomInfra.belongsTo(db.Room);
    db.RoomInfra.belongsTo(db.Infra);
  }
};
