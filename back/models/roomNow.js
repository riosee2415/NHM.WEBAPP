const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class RoomNow extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(100), // 이름
          allowNull: false,
        },
        mobile: {
          type: DataTypes.STRING(300), // 전화번호
          allowNull: false,
        },
        deposit: {
          type: DataTypes.INTEGER, // 보증금
          allowNull: false,
        },

        rentfee: {
          type: DataTypes.INTEGER, // 임대료
          allowNull: false,
        },
        region: {
          type: DataTypes.STRING(300), // 지역
          allowNull: false,
        },
        movingdate: {
          type: DataTypes.DATE, // 이사 날짜
          allowNull: false,
        },
        contractPeriod: {
          type: DataTypes.DATE, // 계약기간
          allowNull: false,
        },

        messengerTypeOrId: {
          type: DataTypes.STRING(300), // 메신저 유형 및 아이디
          allowNull: false,
        },

        email: {
          type: DataTypes.STRING(300), // 이메일
          allowNull: false,
        },

        otherPreferences: {
          type: DataTypes.STRING(900), // 다른요청사항
          allowNull: false,
        },

        isComplete: {
          type: DataTypes.BOOLEAN, // 확인, 미확인
          defaultValue: false,
          allowNull: false,
        },

        completedAt: {
          type: DataTypes.DATE, // 처리 날짜
          allowNull: true,
        },
      },
      {
        modelName: "RoomNow",
        tableName: "roomNow",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.RoomNow.belongsTo(db.Room);
  }
};
