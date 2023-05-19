const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const models = require("../models");

const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

const router = express.Router();

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_Id,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.S3_BUCKET_NAME,
    key(req, file, cb) {
      cb(
        null,
        `${
          process.env.S3_STORAGE_FOLDER_NAME
        }/original/${Date.now()}_${path.basename(file.originalname)}`
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post(
  "/image",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    return res.json({ path: req.file.location });
  }
);

////////////////////////////////////////////////////
// ROOM TYPE  //////////////////////////////////////
////////////////////////////////////////////////////

/**
 * SUBJECT : 지역 목록
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/17
 */
router.post("/type/list", async (req, res, next) => {
  const selectQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY createdAt)   AS num,
          id,
          thumbnail,
          title,
          imagePath,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt
    FROM  roomType
   WHERE  isDelete = 0 
   ORDER  BY num DESC
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

//매물 지역 타입 이미지 생성
router.post("/type/create", isAdminCheck, async (req, res, next) => {
  const insertQuery = `
    INSERT  INTO  roomType
    (
      thumbnail,
      title,
      imagePath,
      createdAt,
      updatedAt
    )
    VALUES
    (
      "https://via.placeholder.com/350",
      "임시 이름",
      "https://via.placeholder.com/1000x300",
      NOW(),
      NOW()
    )
  `;

  try {
    await models.sequelize.query(insertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("지역을 생성할 수 없습니다.");
  }
});

// 매물 지역 타입 이미지 수정
router.post("/type/update", isAdminCheck, async (req, res, next) => {
  const { title, imagePath, thumbnail, typeId } = req.body;

  const updateQuery = `
    UPDATE  roomType
       SET  title = "${title}", 
            thumbnail = "${thumbnail}",
            imagePath = "${imagePath}",
            updatedAt = NOW()
     WHERE  id = ${typeId}
  `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("해당 데이터를 수정항 수 없습니다.");
  }
});

// 매물 지역 타입 이미지 삭제
router.post("/type/delete", isAdminCheck, async (req, res, next) => {
  const { typeId } = req.body;

  const updateQuery = `
    UPDATE  roomType
       SET  isDelete = 1,
            deletedAt = NOW()
     WHERE  id = ${typeId}
  `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("해당 데이터를 삭제할 수 없습니다.");
  }
});

////////////////////////////////////////////////////
// ROOM  ///////////////////////////////////////////
////////////////////////////////////////////////////

/**
 * SUBJECT : 룸 목록
 * PARAMETERS : page
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/17
 */
router.post("/list", async (req, res, next) => {
  const { page, RoomTypeId } = req.body;

  const LIMIT = 16;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 16;

  const _RoomTypeId = RoomTypeId ? RoomTypeId : false;

  const lengthQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)                       AS num,
          A.id,
          A.roomNum,
          A.thumbnail,
          A.kiIndex,
          A.title,
          A.subTitle,
          A.deposit1,
          A.deposit2,
          A.deposit3,
          A.rentFee1,
          A.rentFee2,
          A.rentFee3,
          A.expense1,
          A.expense2,
          A.expense3,
          A.deposit1 + A.rentFee1 + A.expense1                           AS 6MonthTotalPrice,
          FORMAT(A.deposit1 + A.rentFee1 + A.expense1, 0)                AS 6MonthFormatTotalPrice,
          CONCAT(FORMAT(A.deposit1 + A.rentFee1 + A.expense1, 0), "￦")   AS 6MonthConcatTotalPrice,
          A.deposit2 + A.rentFee2 + A.rentFee2                           AS 1YearTotalPrice,
          FORMAT(A.deposit2 + A.rentFee2 + A.rentFee2, 0)                AS 1YearFormatTotalPrice,
          CONCAT(FORMAT(A.deposit2 + A.rentFee2 + A.rentFee2, 0), "￦")   AS 1YearConcatTotalPrice,
          A.deposit3 + A.rentFee3 + A.expense3                           AS 2YearTotalPrice,
          FORMAT(A.deposit3 + A.rentFee3 + A.expense3, 0)                AS 2YearFormatTotalPrice,
          CONCAT(FORMAT(A.deposit3 + A.rentFee3 + A.expense3, 0), "￦")   AS 2YearConcatTotalPrice,
          A.moveInDate,
          DATE_FORMAT(A.moveInDate, "%Y년 %m월 %d일")                     AS viewMoveInDate,
          DATE_FORMAT(A.moveInDate, "%Y-%m-%d")                         AS viewFrontMoveInDate,
          A.detail,
          A.realEstateName,
          A.realEstateAddress,
          A.region,
          A.onOff,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
          B.thumbnail                                 AS roomTypeThumbnail,
          B.title                                     AS roomTypeTitle,
          B.imagePath                                 AS roomTypeImagePath
    FROM  rooms       A
   INNER
    JOIN  roomType    B
      ON  A.RoomTypeId = B.id
   WHERE  A.isDelete = 0
          ${_RoomTypeId ? `AND A.RoomTypeId = ${_RoomTypeId}` : ``}
  `;

  const selectQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)                       AS num,
          A.id,
          A.roomNum,
          A.thumbnail,
          A.kiIndex,
          A.title,
          A.subTitle,
          A.deposit1,
          A.deposit2,
          A.deposit3,
          A.rentFee1,
          A.rentFee2,
          A.rentFee3,
          A.expense1,
          A.expense2,
          A.expense3,
          A.deposit1 + A.rentFee1 + A.expense1                           AS 6MonthTotalPrice,
          FORMAT(A.deposit1 + A.rentFee1 + A.expense1, 0)                AS 6MonthFormatTotalPrice,
          CONCAT(FORMAT(A.deposit1 + A.rentFee1 + A.expense1, 0), "￦")   AS 6MonthConcatTotalPrice,
          A.deposit2 + A.rentFee2 + A.rentFee2                           AS 1YearTotalPrice,
          FORMAT(A.deposit2 + A.rentFee2 + A.rentFee2, 0)                AS 1YearFormatTotalPrice,
          CONCAT(FORMAT(A.deposit2 + A.rentFee2 + A.rentFee2, 0), "￦")   AS 1YearConcatTotalPrice,
          A.deposit3 + A.rentFee3 + A.expense3                           AS 2YearTotalPrice,
          FORMAT(A.deposit3 + A.rentFee3 + A.expense3, 0)                AS 2YearFormatTotalPrice,
          CONCAT(FORMAT(A.deposit3 + A.rentFee3 + A.expense3, 0), "￦")   AS 2YearConcatTotalPrice,
          A.moveInDate,
          DATE_FORMAT(A.moveInDate, "%Y년 %m월 %d일")                     AS viewMoveInDate,
          DATE_FORMAT(A.moveInDate, "%Y-%m-%d")                         AS viewFrontMoveInDate,
          A.detail,
          A.realEstateName,
          A.realEstateAddress,
          A.region,
          A.onOff,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
          B.thumbnail                                 AS roomTypeThumbnail,
          B.title                                     AS roomTypeTitle,
          B.imagePath                                 AS roomTypeImagePath
    FROM  rooms       A
   INNER
    JOIN  roomType    B
      ON  A.RoomTypeId = B.id
   WHERE  A.isDelete = 0
          ${_RoomTypeId ? `AND A.RoomTypeId = ${_RoomTypeId}` : ``}
   ORDER  BY num DESC
   LIMIT  ${LIMIT}
  OFFSET  ${OFFSET}
  `;

  try {
    const lengths = await models.sequelize.query(lengthQuery);
    const room = await models.sequelize.query(selectQuery);

    const roomLen = lengths[0].length;

    const lastPage =
      roomLen % LIMIT > 0 ? roomLen / LIMIT + 1 : roomLen / LIMIT;

    return res.status(200).json({
      rooms: room[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("룸 목록을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 룸 목록 (관리자 리스트)
 * PARAMETERS : page
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/17
 */
router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const { RoomTypeId } = req.body;

  const _RoomTypeId = RoomTypeId ? RoomTypeId : false;

  const selectQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)                       AS num,
          A.id,
          A.roomNum,
          A.thumbnail,
          A.kiIndex,
          A.title,
          A.subTitle,
          A.deposit1,
          A.deposit2,
          A.deposit3,
          A.rentFee1,
          A.rentFee2,
          A.rentFee3,
          A.expense1,
          A.expense2,
          A.expense3,
          A.deposit1 + A.rentFee1 + A.expense1                           AS 6MonthTotalPrice,
          FORMAT(A.deposit1 + A.rentFee1 + A.expense1, 0)                AS 6MonthFormatTotalPrice,
          CONCAT(FORMAT(A.deposit1 + A.rentFee1 + A.expense1, 0), "￦")   AS 6MonthConcatTotalPrice,
          A.deposit2 + A.rentFee2 + A.rentFee2                           AS 1YearTotalPrice,
          FORMAT(A.deposit2 + A.rentFee2 + A.rentFee2, 0)                AS 1YearFormatTotalPrice,
          CONCAT(FORMAT(A.deposit2 + A.rentFee2 + A.rentFee2, 0), "￦")   AS 1YearConcatTotalPrice,
          A.deposit3 + A.rentFee3 + A.expense3                           AS 2YearTotalPrice,
          FORMAT(A.deposit3 + A.rentFee3 + A.expense3, 0)                AS 2YearFormatTotalPrice,
          CONCAT(FORMAT(A.deposit3 + A.rentFee3 + A.expense3, 0), "￦")   AS 2YearConcatTotalPrice,
          A.moveInDate,
          DATE_FORMAT(A.moveInDate, "%Y년 %m월 %d일")                     AS viewMoveInDate,
          DATE_FORMAT(A.moveInDate, "%Y-%m-%d")                         AS viewFrontMoveInDate,
          A.detail,
          A.realEstateName,
          A.realEstateAddress,
          A.region,
          A.onOff,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
          B.thumbnail                                 AS roomTypeThumbnail,
          B.title                                     AS roomTypeTitle,
          B.imagePath                                 AS roomTypeImagePath,
          A.RoomTypeId
    FROM  rooms       A
   INNER
    JOIN  roomType    B
      ON  A.RoomTypeId = B.id
   WHERE  A.isDelete = 0
          ${_RoomTypeId ? `AND A.RoomTypeId = ${_RoomTypeId}` : ``}
   ORDER  BY num DESC
  `;

  try {
    const room = await models.sequelize.query(selectQuery);

    return res.status(200).json(room[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("룸 목록을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 룸 상세정보
 * PARAMETERS : page
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/17
 */
router.post("/detail", async (req, res, next) => {
  const { id } = req.body;

  const selectQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)                       AS num,
          A.id,
          A.roomNum,
          A.thumbnail,
          A.kiIndex,
          A.title,
          A.subTitle,
          A.deposit1,
          A.deposit2,
          A.deposit3,
          A.rentFee1,
          A.rentFee2,
          A.rentFee3,
          A.expense1,
          A.expense2,
          A.expense3,
          A.deposit1 + A.rentFee1 + A.expense1                           AS monthTotalPrice,
          FORMAT(A.deposit1 + A.rentFee1 + A.expense1, 0)                AS monthFormatTotalPrice,
          CONCAT(FORMAT(A.deposit1 + A.rentFee1 + A.expense1, 0), "￦")   AS monthConcatTotalPrice,
          A.deposit2 + A.rentFee2 + A.rentFee2                           AS oneYearTotalPrice,
          FORMAT(A.deposit2 + A.rentFee2 + A.rentFee2, 0)                AS oneYearFormatTotalPrice,
          CONCAT(FORMAT(A.deposit2 + A.rentFee2 + A.rentFee2, 0), "￦")   AS oneYearConcatTotalPrice,
          A.deposit3 + A.rentFee3 + A.expense3                           AS twoYearTotalPrice,
          FORMAT(A.deposit3 + A.rentFee3 + A.expense3, 0)                AS twoYearFormatTotalPrice,
          CONCAT(FORMAT(A.deposit3 + A.rentFee3 + A.expense3, 0), "￦")   AS twoYearConcatTotalPrice,
          A.moveInDate,
          DATE_FORMAT(A.moveInDate, "%Y년 %m월 %d일")                     AS viewMoveInDate,
          DATE_FORMAT(A.moveInDate, "%Y-%m-%d")                         AS viewFrontMoveInDate,
          A.detail,
          A.realEstateName,
          A.realEstateAddress,
          A.region,
          A.onOff,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
          B.thumbnail                                 AS roomTypeThumbnail,
          B.title                                     AS roomTypeTitle,
          B.imagePath                                 AS roomTypeImagePath,
          A.RoomTypeId
    FROM  rooms       A
   INNER
    JOIN  roomType    B
      ON  A.RoomTypeId = B.id
   WHERE  A.isDelete = 0
     AND  A.id = ${id}
  `;

  const bannerQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY createdAt)   AS num,
          id,
          imagePath,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt
    FROM  roomBanner
   WHERE  RoomId = ${id}
   ORDER  BY num DESC
  `;

  const infraQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.sort)   AS num,
          A.sort,
          A.RoomId,
          A.InfraId,
          B.title,
          B.imagePath,
          B.createdAt,
          B.updatedAt,
          DATE_FORMAT(B.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(B.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt
    FROM  roomInfra   A
   INNER
    JOIN  infras      B
      ON  A.InfraId = B.id
   WHERE  B.isDelete = 0 
     AND  A.RoomId = ${id}
   ORDER  BY num ASC
  `;

  const optionQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.sort)   AS num,
          A.sort,
          A.RoomId,
          A.OptionId,
          B.title,
          B.imagePath,
          B.createdAt,
          B.updatedAt,
          DATE_FORMAT(B.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(B.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt
    FROM  roomOption    A
   INNER
    JOIN  options       B
      ON  A.OptionId = B.id
   WHERE  B.isDelete = 0 
     AND  A.RoomId = ${id}
   ORDER  BY num ASC
  `;

  const maintenanceQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.sort)   AS num,
          A.sort,
          A.RoomId,
          A.MaintenanceId,
          B.id,
          B.title,
          B.imagePath,
          B.createdAt,
          B.updatedAt,
          DATE_FORMAT(B.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(B.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt
    FROM  roomMaintenances    A
   INNER
    JOIN  maintenances        B
      ON  A.MaintenanceId = B.id
   WHERE  B.isDelete = 0 
     AND  A.RoomId = ${id}
   ORDER  BY num ASC
  `;

  try {
    const room = await models.sequelize.query(selectQuery);

    if (room[0].length === 0) {
      return res.status(401).send("존재하지 않는 데이터입니다.");
    }

    const bannerData = await models.sequelize.query(bannerQuery);
    const infraData = await models.sequelize.query(infraQuery);
    const optionData = await models.sequelize.query(optionQuery);
    const maintenanceData = await models.sequelize.query(maintenanceQuery);

    return res.status(200).json({
      room: room[0][0],
      bannerData: bannerData[0],
      infraData: infraData[0],
      optionData: optionData[0],
      maintenanceData: maintenanceData[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("룸 목록을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 룸 생성
 * PARAMETERS : RoomTypeId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/17
 */
router.post("/create", isAdminCheck, async (req, res, next) => {
  const { RoomTypeId } = req.body;

  const insertQuery = `
  INSERT  INTO  rooms
  (
    roomNum,
    thumbnail,
    kiIndex,
    title,
    subTitle,
    deposit1,
    deposit2,
    deposit3,
    rentFee1,
    rentFee2,
    rentFee3,
    expense1,
    expense2,
    expense3,
    moveInDate,
    detail,
    realEstateName,
    realEstateAddress,
    region,
    createdAt,
    updatedAt,
    RoomTypeId
  )
  VALUES
  (
    "00000000",
    "https://via.placeholder.com/350x350",
    "5.0",
    "임시 타이틀",
    "임시 서브 타이틀",
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    NOW(),
    "임시 설명",
    "임시 매물이름",
    "임시 매물주소",
    "임시 지역",
    NOW(),
    NOW(),
    ${RoomTypeId}
  )
  `;

  try {
    await models.sequelize.query(insertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("룸을 생성할 수 없습니다.");
  }
});

/**
 * SUBJECT : 룸 수정
 * PARAMETERS : RoomTypeId,
                id,
                roomNum,
                thumbnail,
                kiIndex,
                title,
                subTitle,
                deposit1,
                deposit2,
                deposit3,
                rentFee1,
                rentFee2,
                rentFee3,
                expense1,
                expense2,
                expense3,
                moveInDate,
                detail,
                realEstateName,
                realEstateAddress,
                region,
                infraIds,
                optionIds,
                maintenanceIds,
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/17
 */

// 배열은 해당 폼에 맞도록 보내주세요.
// infraIds:
// [
//   {
//     id: 1,
//     sort: 1,
//   },
//   {
//     id: 2,
//     sort: 2,
//   },
// ];
// optionIds:
// [
//   {
//     id: 1,
//     sort: 1,
//   },
//   {
//     id: 2,
//     sort: 2,
//   },
// ];
// maintenanceIds:
// [
//   {
//     id: 1,
//     sort: 1,
//   },
//   {
//     id: 2,
//     sort: 2,
//   },
// ];

router.post("/update", isAdminCheck, async (req, res, next) => {
  const {
    RoomTypeId,
    id,
    roomNum,
    thumbnail,
    kiIndex,
    title,
    subTitle,
    deposit1,
    deposit2,
    deposit3,
    rentFee1,
    rentFee2,
    rentFee3,
    expense1,
    expense2,
    expense3,
    moveInDate,
    detail,
    realEstateName,
    realEstateAddress,
    region,
    infraIds,
    optionIds,
    maintenanceIds,
  } = req.body;

  if (!Array.isArray(infraIds)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  if (!Array.isArray(optionIds)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  if (!Array.isArray(maintenanceIds)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  const updateQuery = `
  UPDATE  rooms
     SET  roomNum = "${roomNum}",
          thumbnail = "${thumbnail}",
          kiIndex = "${kiIndex}",
          title = "${title}",
          subTitle = "${subTitle}",
          deposit1 = ${deposit1},
          deposit2 = ${deposit2},
          deposit3 = ${deposit3},
          rentFee1 = ${rentFee1},
          rentFee2 = ${rentFee2},
          rentFee3 = ${rentFee3},
          expense1 = ${expense1},
          expense2 = ${expense2},
          expense3 = ${expense3},
          moveInDate = "${moveInDate}",
          detail = "${detail}",
          realEstateName = "${realEstateName}",
          realEstateAddress = "${realEstateAddress}",
          region = "${region}",
          RoomTypeId = ${RoomTypeId},
          updatedAt = NOW()
   WHERE  id = ${id}
  `;

  try {
    await models.sequelize.query(updateQuery);

    const infraDeleteQuery = `
    DELETE
      FROM  roomInfra
     WHERE  RoomId = ${id}
    `;

    const optionDeleteQuery = `
    DELETE
      FROM  roomOption
     WHERE  RoomId = ${id}
    `;

    const maintenanceDeleteQuery = `
    DELETE
      FROM  roomMaintenances
     WHERE  RoomId = ${id}
    `;

    await models.sequelize.query(infraDeleteQuery);
    await models.sequelize.query(optionDeleteQuery);
    await models.sequelize.query(maintenanceDeleteQuery);

    await Promise.all(
      infraIds.map(async (data) => {
        const infraInsertQuery = `
        INSERT  INTO  roomInfra
        (
          sort,
          RoomId,
          InfraId,
          createdAt,
          updatedAt
        )
        VALUES
        (
          ${data.sort},
          ${id},
          ${data.id},
          NOW(),
          NOW()
        )
        `;

        await models.sequelize.query(infraInsertQuery);
      })
    );

    await Promise.all(
      optionIds.map(async (data) => {
        const optionInsertQuery = `
        INSERT  INTO  roomOption
        (
          sort,
          RoomId,
          OptionId,
          createdAt,
          updatedAt
        )
        VALUES
        (
          ${data.sort},
          ${id},
          ${data.id},
          NOW(),
          NOW()
        )
        `;

        await models.sequelize.query(optionInsertQuery);
      })
    );

    await Promise.all(
      maintenanceIds.map(async (data) => {
        const maintenanceInsertQuery = `
        INSERT  INTO  roomMaintenances
        (
          sort,
          RoomId,
          MaintenanceId,
          createdAt,
          updatedAt
        )
        VALUES
        (
          ${data.sort},
          ${id},
          ${data.id},
          NOW(),
          NOW()
        )
        `;

        await models.sequelize.query(maintenanceInsertQuery);
      })
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("룸 정보를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 룸 삭제
 * PARAMETERS : id
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/17
 */
router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const deleteQuery = `
  UPDATE  rooms
     SET  isDelete = 1,
          deletedAt = NOW()
   WHERE  id = ${id}
  `;

  try {
    await models.sequelize.query(deleteQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("룸 정보를 삭제할 수 없습니다.");
  }
});

////////////////////////////////////////////////////
// ROOM BANNER  ////////////////////////////////////
////////////////////////////////////////////////////

/**
 * SUBJECT : 룸 배너 목록
 * PARAMETERS : RoomId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/17
 */
router.post("/banner/list", async (req, res, next) => {
  const { RoomId } = req.body;

  const selectQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY createdAt)   AS num,
          id,
          imagePath,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt
    FROM  roomBanner
   WHERE  RoomId = ${RoomId}
   ORDER  BY num DESC
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("배너 목록을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 룸 배너 생성
 * PARAMETERS : RoomId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/17
 */
router.post("/banner/create", isAdminCheck, async (req, res, next) => {
  const { RoomId } = req.body;

  const insertQuery = `
  INSERT  INTO  roomBanner
  (
    imagePath,
    createdAt,
    updatedAt,
    RoomId
  )
  VALUES
  (
    "https://via.placeholder.com/1000x300",
    NOW(),
    NOW(),
    ${RoomId}
  )
  `;

  try {
    await models.sequelize.query(insertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("배너를 생성할 수 없습니다.");
  }
});

/**
 * SUBJECT : 룸 배너 수정
 * PARAMETERS : bannerId, imagePath
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/17
 */
router.post("/banner/update", isAdminCheck, async (req, res, next) => {
  const { bannerId, imagePath } = req.body;

  const updateQuery = `
  UPDATE  roomBanner
     SET  imagePath = "${imagePath}",
          updatedAt = NOW()
   WHERE  id = ${bannerId}
  `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("배너를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 룸 배너 삭제
 * PARAMETERS : bannerId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/17
 */
router.post("/banner/delete", isAdminCheck, async (req, res, next) => {
  const { bannerId } = req.body;

  const deleteQuery = `
  DELETE
    FROM  roomBanner
   WHERE  id = ${bannerId}
  `;

  try {
    await models.sequelize.query(deleteQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("배너를 삭제할 수 없습니다.");
  }
});

////////////////////////////////////////////////////
// ROOM OPTION  ////////////////////////////////////
////////////////////////////////////////////////////

/**
 * SUBJECT : 옵션 목록
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/17
 */
router.post("/option/list", async (req, res, next) => {
  const selectQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY createdAt)   AS num,
          id,
          title,
          imagePath,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt
    FROM  options
   WHERE  isDelete = 0 
   ORDER  BY num DESC
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("옵션을 조회할 수 없습니다.");
  }
});

//옵션 아이콘 생성
router.post("/option/create", isAdminCheck, async (req, res, next) => {
  const insertQuery = `
    INSERT  INTO  options
    (
      title,
      imagePath,
      createdAt,
      updatedAt
    )
    VALUES
    (
      "임시 옵션",
      "https://via.placeholder.com/300x300",
      NOW(),
      NOW()
    )
  `;

  try {
    await models.sequelize.query(insertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("옵션을 생성할 수 없습니다.");
  }
});

// 옵션 아이콘 수정
router.post("/option/update", isAdminCheck, async (req, res, next) => {
  const { title, imagePath, typeId } = req.body;

  const updateQuery = `
    UPDATE  options
       SET  title = "${title}",
            imagePath = "${imagePath}",
            updatedAt = NOW()
     WHERE  id = ${typeId}
  `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("해당 데이터를 수정항 수 없습니다.");
  }
});

// 옵션 아이콘 삭제
router.post("/option/delete", isAdminCheck, async (req, res, next) => {
  const { optionId } = req.body;

  const updateQuery = `
    UPDATE  options
       SET  isDelete = 1,
            deletedAt = NOW()
     WHERE  id = ${optionId}
  `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("해당 데이터를 삭제할 수 없습니다.");
  }
});

////////////////////////////////////////////////////
// ROOM INFRA  /////////////////////////////////////
////////////////////////////////////////////////////

/**
 * SUBJECT : 인프라 목록
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/17
 */
router.post("/infra/list", async (req, res, next) => {
  const selectQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY createdAt)   AS num,
          id,
          title,
          imagePath,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt
    FROM  infras
   WHERE  isDelete = 0 
   ORDER  BY num DESC
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("인프라를 조회할 수 없습니다.");
  }
});

//인프라 아이콘 생성
router.post("/infra/create", isAdminCheck, async (req, res, next) => {
  const insertQuery = `
    INSERT  INTO  infras
    (
      title,
      imagePath,
      createdAt,
      updatedAt
    )
    VALUES
    (
      "임시 인프라",
      "https://via.placeholder.com/300x300",
      NOW(),
      NOW()
    )
  `;

  try {
    await models.sequelize.query(insertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("인프라를 생성할 수 없습니다.");
  }
});

// 인프라 아이콘 수정
router.post("/infra/update", isAdminCheck, async (req, res, next) => {
  const { title, imagePath, typeId } = req.body;

  const updateQuery = `
    UPDATE  infras
       SET  title = "${title}",
            imagePath = "${imagePath}",
            updatedAt = NOW()
     WHERE  id = ${typeId}
  `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("해당 데이터를 수정항 수 없습니다.");
  }
});

// 인프라 아이콘 삭제
router.post("/infra/delete", isAdminCheck, async (req, res, next) => {
  const { infraId } = req.body;

  const updateQuery = `
    UPDATE  infras
       SET  isDelete = 1,
            deletedAt = NOW()
     WHERE  id = ${infraId}
  `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("해당 데이터를 삭제할 수 없습니다.");
  }
});

////////////////////////////////////////////////////
// ROOM MAINTENANCE  ///////////////////////////////
////////////////////////////////////////////////////

/**
 * SUBJECT : 인프라 목록
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/17
 */
router.post("/maintenance/list", async (req, res, next) => {
  const selectQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY createdAt)   AS num,
          id,
          title,
          imagePath,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt
    FROM  maintenances
   WHERE  isDelete = 0 
   ORDER  BY num DESC
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

//유지보수 비용 아이콘 생성
router.post("/maintenance/create", isAdminCheck, async (req, res, next) => {
  const insertQuery = `
    INSERT  INTO  maintenances
    (
      title,
      imagePath,
      createdAt,
      updatedAt
    )
    VALUES
    (
      "임시 유지보수 비용 아이콘",
      "https://via.placeholder.com/300x300",
      NOW(),
      NOW()
    )
  `;

  try {
    await models.sequelize.query(insertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 생성할 수 없습니다.");
  }
});

// 유지보수 아이콘 수정
router.post("/maintenance/update", isAdminCheck, async (req, res, next) => {
  const { title, imagePath, typeId } = req.body;

  const updateQuery = `
    UPDATE  maintenances
       SET  title = "${title}",
            imagePath = "${imagePath}",
            updatedAt = NOW()
     WHERE  id = ${typeId}
  `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("해당 데이터를 수정항 수 없습니다.");
  }
});

// 유지보수 아이콘 삭제
router.post("/maintenance/delete", isAdminCheck, async (req, res, next) => {
  const { maintenanceId } = req.body;

  const updateQuery = `
    UPDATE  maintenances
       SET  isDelete = 1,
            deletedAt = NOW()
     WHERE  id = ${maintenanceId}
  `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("해당 데이터를 삭제할 수 없습니다.");
  }
});

////////////////////////////////////////////////////
// ROOM NOW ////////////////////////////////////////
////////////////////////////////////////////////////

/**
 * SUBJECT : 매물구매 리스트
 * PARAMETERS : isComplete
 * ORDER BY : createdAt DESC
 * STATEMENT : -
 * DEVELOPMENT : 홍민기
 * DEV DATE : 2023/05/18
 */

router.post("/roomNow/list", isAdminCheck, async (req, res, next) => {
  const { isComplete } = req.body;

  const _isComplete = isComplete ? parseInt(isComplete) : 3;

  const selectQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)                       AS num,
          A.id,
          A.name,
          A.mobile,
          A.deposit,
          A.rentfee,
          A.region,
          A.movingdate,
          A.contractPeriod,
          DATE_FORMAT(A.movingdate, "%Y년 %m월 %d일")    AS viewMovingdate,
          DATE_FORMAT(A.contractPeriod, "%Y년 %m월 %d일")    AS viewContractPeriod,
          A.messengerTypeOrId,
          A.email,
          A.otherPreferences,
          A.isComplete,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
          B.title
    FROM  roomNow				A
   INNER
    JOIN  rooms         B
      ON  A.RoomId = B.id
   WHERE  1 = 1
          ${
            _isComplete === 1
              ? `AND  A.isComplete = 1`
              : _isComplete === 2
              ? `AND  A.isComplete = 0`
              : ``
          }
   ORDER  BY  A.createdAt DESC
  `;
  try {
    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (e) {
    console.error(e);
    return res.status(401).send("매물 구매 리스트를 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 매물구매 생성
 * PARAMETERS : name
                mobile
                deposit
                rentfee
                region
                movingdate
                contractPeriod
                messengerTypeOrId
                email
                otherPreferences
                RooomId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 홍민기
 * DEV DATE : 2023/05/18
 */

router.post("/roomNow/create", async (req, res, next) => {
  const {
    name,
    mobile,
    deposit,
    rentfee,
    region,
    movingdate,
    contractPeriod,
    messengerTypeOrId,
    email,
    otherPreferences,
    RoomId,
  } = req.body;

  const isnertQuery = `
  INSERT INTO roomNow (
    name,
    mobile,
    deposit,
    rentfee,
    region,
    movingdate,
    contractPeriod,
    messengerTypeOrId,
    email,
    otherPreferences,
    RoomId,
    createdAt,
    updatedAt
  )
  VALUES
  (
    ${name},
    ${mobile},
    ${deposit},
    ${rentfee},
    ${region},
    ${movingdate},
    ${contractPeriod},
    ${messengerTypeOrId},
    ${email},
    ${otherPreferences},
    ${RoomId},
    NOW(),
    NOW()
  )
  `;
  try {
    await models.sequelize.query(isnertQuery);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("매물 구매를 할 수 없습니다.");
  }
});

/**
 * SUBJECT : 매물구매 확인
 * PARAMETERS : id
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 홍민기
 * DEV DATE : 2023/05/18
 */

router.post("/roomNow/isComplete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const findQuery = `
  SELECT  id,
          isComplete
    FROM  roomNow
   WHERE  id = ${id}
  `;

  const updateQuery = `
  UPDATE  roomNow
     SET  isComplete = 1
   WHERE  id = ${id}

  `;
  try {
    const find = await models.sequelize.query(findQuery);

    if (find[0].length === 0) {
      return res.status(401).send("확인처리할 매물이 없습니다.");
    }

    if (find[0][0].isComplete) {
      return res.status(401).send("이미 확인된 매물입니다.");
    }

    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(401).send("매물을 확인처리할 수 없습니다.");
  }
});

module.exports = router;
