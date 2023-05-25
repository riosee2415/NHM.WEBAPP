// 룸베너
const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class RoomBanner extends Model {
  static init(sequelize) {
    return super.init(
      {
        imagePath: {
          type: DataTypes.STRING(3000),
          allowNull: false,
        },
      },
      {
        modelName: "RoomBanner",
        tableName: "roomBanner",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.RoomBanner.belongsTo(db.Room);
  }
};
