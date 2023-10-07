"use strict";

const { returnErrorRes } = require("../../../Helpers");
const userModel = require("../../../Model/User/Create_user.");
const bcrypt = require("bcrypt");

async function checkUserExistence(req, res, next) {
  const { email } = req.body;
  try {
    const existence = await userModel.exists({ email });

    if (existence === null) {
      return next();
    }

    const errorMsg =
      "Given email id already exist, try with different email id";
    return returnErrorRes(res, errorMsg, 409);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return returnErrorRes(res);
  }
}

async function hashPassword(req, res, next) {
  try {
    const { password } = req.body;

    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
    const hashPassword = await bcrypt.hash(password, salt);
    req.hashPassword = hashPassword;
    return next();
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return returnErrorRes(res);
  }
}

async function addUserIn_Db(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const hashPassword = req.hashPassword;

    const createUser = await new userModel({
      name,
      email,
      password: hashPassword,
    });
    createUser
      .save()
      .then(() => {
        return next();
      })
      .catch((error) => {
        console.error(error); // Log the error for debugging purposes
        const errorMsg = "Please try again some time latter";
        return returnErrorRes(res, errorMsg, 500);
      });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return returnErrorRes(res);
  }
}

module.exports = { checkUserExistence, hashPassword, addUserIn_Db };
