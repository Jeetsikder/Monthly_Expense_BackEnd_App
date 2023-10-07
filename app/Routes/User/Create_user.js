const express = require("express");
const router = express.Router();

const { handelSchemaJoi } = require("../../Schema/User/Create_user");
const {
  checkUserExistence,
  hashPassword,
  addUserIn_Db,
} = require("../../Controllers/User/Create_user");
const { returnSuccessRes } = require("../../Helpers");

// # Schema
router.use(handelSchemaJoi);

// # Middlewares
router.use(checkUserExistence, hashPassword, addUserIn_Db);

router.use("/", (req, res) => {
  try {
    const successMsg = "Account created successfully";
    return returnSuccessRes(res, successMsg);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return returnErrorRes(res);
  }
});

module.exports = router;
