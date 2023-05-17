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
// ROOM  ///////////////////////////////////////////
////////////////////////////////////////////////////

////////////////////////////////////////////////////
// ROOM BANNER  ////////////////////////////////////
////////////////////////////////////////////////////

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
      title,
      imagePath,
      createdAt,
      updatedAt
    )
    VALUES
    (
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

// 매물 지역 타입 이미지 삭제
router.post("/type/delete", isAdminCheck, async (req, res, next) => {
  const { typeId } = req.body;

  const updateQuery = `
    UPDATE  roomType
       SET  isDelete = TURE
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

// 매물 지역 타입 이미지 수정
router.post("/type/update", isAdminCheck, async (req, res, next) => {
  const { title, imagePath, typeId } = req.body;

  const updateQuery = `
    UPDATE  roomType
       SET  title = "${title}",
            imagePath = "${imagePath}",
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
    return res.status(400).send("옵션을 생성할 수 없습니다.");
  }
});

// 옵션 아이콘 삭제
router.post("/option/delete", isAdminCheck, async (req, res, next) => {
  const { optionId } = req.body;

  const updateQuery = `
    UPDATE  options
       SET  isDelete = TURE
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

// 옵션 아이콘 수정
router.post("/option/update", isAdminCheck, async (req, res, next) => {
  const { title, imagePath, typeId } = req.body;

  const updateQuery = `
    UPDATE  options
       SET  title = "${title}",
            imagePath = "${imagePath}",
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
    return res.status(400).send("인프라를 생성할 수 없습니다.");
  }
});

// 인프라 아이콘 삭제
router.post("/infra/delete", isAdminCheck, async (req, res, next) => {
  const { infraId } = req.body;

  const updateQuery = `
    UPDATE  infras
       SET  isDelete = TURE
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

// 인프라 아이콘 수정
router.post("/infra/update", isAdminCheck, async (req, res, next) => {
  const { title, imagePath, typeId } = req.body;

  const updateQuery = `
    UPDATE  infras
       SET  title = "${title}",
            imagePath = "${imagePath}",
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
    return res.status(400).send("데이터를 생성할 수 없습니다.");
  }
});

// 유지보수 아이콘 삭제
router.post("/maintenance/delete", isAdminCheck, async (req, res, next) => {
  const { maintenanceId } = req.body;

  const updateQuery = `
    UPDATE  maintenances
       SET  isDelete = TURE
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

// 유지보수 아이콘 수정
router.post("/maintenance/update", isAdminCheck, async (req, res, next) => {
  const { title, imagePath, typeId } = req.body;

  const updateQuery = `
    UPDATE  maintenances
       SET  title = "${title}",
            imagePath = "${imagePath}",
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

module.exports = router;
