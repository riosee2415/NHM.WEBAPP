// 룸베너
const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class RoomBanner extends Model {
  static init(sequelize) {
    return super.init(
      {
        imagePath: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
      },
      {
        modelName: "RoomBanner",
        tableName: "roomBanners",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
