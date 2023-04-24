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
          type: DataTypes.STRING(100), // 썸네일 1장
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
          type: DataTypes.STRING(100), // 6개월 deposit
          allowNull: false,
        },
        deposit2: {
          type: DataTypes.STRING(100), // 1년 deposit
          allowNull: false,
        },
        deposit3: {
          type: DataTypes.STRING(100), // 2년 deposit
          allowNull: false,
        },
        monthlyPayment1: {
          type: DataTypes.STRING(100), // 6개월 monthlyPay
          allowNull: false,
        },
        monthlyPayment2: {
          type: DataTypes.STRING(100), // 1년 monthlyPay
          allowNull: false,
        },
        monthlyPayment3: {
          type: DataTypes.STRING(100), // 2년 monthlyPay
          allowNull: false,
        },
        realEstateFee1: {
          type: DataTypes.STRING(100), // 6개월 RealEstateFee
          allowNull: false,
        },
        realEstateFee2: {
          type: DataTypes.STRING(100), // 1년 RealEstateFee
          allowNull: false,
        },
        realEstateFee3: {
          type: DataTypes.STRING(100), // 2년 RealEstateFee
          allowNull: false,
        },
        fee1: {
          type: DataTypes.STRING(100), // 6개월 fee
          allowNull: false,
        },
        fee2: {
          type: DataTypes.STRING(100), // 1년 fee
          allowNull: false,
        },
        fee3: {
          type: DataTypes.STRING(100), // 2년 fee
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
