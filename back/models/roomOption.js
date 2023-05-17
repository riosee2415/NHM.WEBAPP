const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class RoomOption extends Model {
  static init(sequelize) {
    return super.init(
      {
        sort: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: "RoomOption",
        tableName: "roomOption",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.RoomOption.belongsTo(db.Room);
    db.RoomOption.belongsTo(db.Option);
  }
};
