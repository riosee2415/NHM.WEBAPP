const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class RoomMaintenance extends Model {
  static init(sequelize) {
    return super.init(
      {
        sort: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: "RoomMaintenance",
        tableName: "roomMaintenances",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.RoomMaintenance.belongsTo(db.Room);
    db.RoomMaintenance.belongsTo(db.Maintenance);
  }
};
