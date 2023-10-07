"use strict";

const { returnErrorRes, createJwtToken } = require("../../../Helpers");
const userModel = require("../../../Model/User/Create_user.");
const bcrypt = require("bcrypt");

async function checkUserExistence(req, res, next) {
  const { email } = req.body;
  try {
    const existence = await userModel.exists({ email });

    if (existence !== null) {
      req.userId = existence._id.toString();
      return next();
    }

    const errorMsg = "Given email id not register with us please sing up fast";
    return returnErrorRes(res, errorMsg, 404);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return returnErrorRes(res);
  }
}

async function matchPassword(req, res, next) {
  try {
    const { password } = req.body;
    const userId = req.userId;

    const getUserPass_fromDb = await userModel
      .findById(userId)
      .select("password");

    // * Password Match
    const matchPassword = await bcrypt.compare(
      password,
      getUserPass_fromDb.password
    );
    if (matchPassword) {
      return next();
    }

    // * Password not match
    const errorMessage = "User name or Password not match";
    return returnErrorRes(res, errorMessage, 401);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return returnErrorRes(res);
  }
}

async function generateAccessToken(req, res, next) {
  const SIGNATURE = process.env.JWT_ACCESS_TOKEN_SIGNATURE;
  const validity = process.env.ACCESS_TOKEN_VALIDITY;
  const payload = {
    user_Id: req.userId,
  };
  const createAccessToken = await createJwtToken(payload, validity, SIGNATURE);
  req.accessToken = createAccessToken;
  return next();
}

module.exports = { checkUserExistence, matchPassword, generateAccessToken };
