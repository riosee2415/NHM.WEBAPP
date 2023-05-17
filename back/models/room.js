// 매물
const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Room extends Model {
  static init(sequelize) {
    return super.init(
      {
        roomNum: {
          type: DataTypes.STRING(100), // 매물번호
          allowNull: false,
        },
        thumbnail: {
          type: DataTypes.STRING(1000), // 썸네일 1장
          allowNull: false,
        },
        kiIndex: {
          type: DataTypes.STRING(100), // Kiindex
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(100), // 제목
          allowNull: false,
        },
        subTitle: {
          type: DataTypes.STRING(100), // 부제목
          allowNull: false,
        },
        deposit1: {
          type: DataTypes.INTEGER, // 6개월 deposit
          allowNull: false,
        },
        deposit2: {
          type: DataTypes.INTEGER, // 1년 deposit
          allowNull: false,
        },
        deposit3: {
          type: DataTypes.INTEGER, // 2년 deposit
          allowNull: false,
        },
        rentFee1: {
          type: DataTypes.INTEGER, // 6개월 rentFee
          allowNull: false,
        },
        rentFee2: {
          type: DataTypes.INTEGER, // 1년 rentFee
          allowNull: false,
        },
        rentFee3: {
          type: DataTypes.INTEGER, // 2년 rentFee
          allowNull: false,
        },
        expense1: {
          type: DataTypes.INTEGER, // 6개월 management expense
          allowNull: false,
        },
        expense2: {
          type: DataTypes.INTEGER, // 1년 management expense
          allowNull: false,
        },
        expense3: {
          type: DataTypes.INTEGER, // 2년 management expense
          allowNull: false,
        },
        moveInDate: {
          type: DataTypes.DATE, // 입주가능
          allowNull: false,
        },
        detail: {
          type: DataTypes.TEXT, // 디테일 설명
          allowNull: false,
        },
        realEstateName: {
          type: DataTypes.STRING(100), // 매물이름
          allowNull: false,
        },
        realEstateAddress: {
          type: DataTypes.STRING(100), // 매물주소
          allowNull: false,
        },
        region: {
          type: DataTypes.STRING(100), // 지역
          allowNull: false,
        },
        onOff: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: 0,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "Room",
        tableName: "rooms",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Room.belongsTo(db.RoomType);
  }
};
