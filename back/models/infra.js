// 인프라
const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Infra extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
        },
        imagePath: {
          type: DataTypes.STRING(1000),
          allowNull: false, // 필수
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        modelName: "Infra",
        tableName: "infras",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
