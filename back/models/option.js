// 옵션 아이콘
const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Option extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(100),
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
        modelName: "Option",
        tableName: "options",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
