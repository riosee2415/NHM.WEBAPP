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
// ROOM TYPE  //////////////////////////////////////
////////////////////////////////////////////////////

//매물 지역 타입 이미지 생성
router.post("/type/create", isAdminCheck, async (req, res, next) => {
  const { title, imagePath } = req.body;

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
      "${title}",
      "${imagePath}",
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

////////////////////////////////////////////////////
// ROOM BANNER  ////////////////////////////////////
////////////////////////////////////////////////////

////////////////////////////////////////////////////
// ROOM OPTION  ////////////////////////////////////
////////////////////////////////////////////////////

//옵션 아이콘 생성
router.post("/option/create", isAdminCheck, async (req, res, next) => {
  const { title, imagePath } = req.body;

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
      "${title}",
      "${imagePath}",
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

////////////////////////////////////////////////////
// ROOM INFRA  /////////////////////////////////////
////////////////////////////////////////////////////

//인프라 아이콘 생성
router.post("/infra/create", isAdminCheck, async (req, res, next) => {
  const { title, imagePath } = req.body;

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
      "${title}",
      "${imagePath}",
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

// 옵션 아이콘 삭제
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

////////////////////////////////////////////////////
// ROOM MAINTENANCE  ///////////////////////////////
////////////////////////////////////////////////////

//유지보수 비용 아이콘 생성
router.post("/maintenance/create", isAdminCheck, async (req, res, next) => {
  const { title, imagePath } = req.body;

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
      "${title}",
      "${imagePath}",
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

// 옵션 아이콘 삭제
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

module.exports = router;
