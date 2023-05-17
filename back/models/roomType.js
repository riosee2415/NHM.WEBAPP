// 룸타입
const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class RoomType extends Model {
  static init(sequelize) {
    return super.init(
      {
        thumbnail: {
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        imagePath: {
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        modelName: "RoomType",
        tableName: "roomType",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
