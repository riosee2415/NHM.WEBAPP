// 인프라
const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Infastructure extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
        },
        thumbnailPath: {
          type: DataTypes.STRING(1000),
          allowNull: false, // 필수
        },
      },
      {
        modelName: "Infastructure",
        tableName: "infastructures",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
