"use strict";

const { verify_JWT, returnErrorRes } = require("../Helpers");
const userModel = require("../Model/User/Create_user.");

async function LoggedINnUserToken_Exist(req, res, next) {
  try {
    const token = req.headers["x-access-token"];
    if (token) {
      return next();
    }

    if (token === undefined) {
      const error_Msg = "x-access-token undefined";
      return returnErrorRes(res, error_Msg, 401);
    }

    const error_Msg = "x-access-token missing in header";
    return returnErrorRes(res, error_Msg, 401);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return returnErrorRes(res);
  }
}

async function LoggedINnUserToken_Verify(req, res, next) {
  try {
    const token = req.headers["x-access-token"];
    const SIGNATURE = process.env.JWT_ACCESS_TOKEN_SIGNATURE;
    const verifyToken = await verify_JWT(token, SIGNATURE);

    if (verifyToken.jwtSuccess) {
      req.userId = verifyToken.decoded.data.user_Id;
      return next();
    }
    if (!verifyToken.jwtSuccess && verifyToken.decoded === "jwt expired") {
      const error_Msg =
        "Your token has expired please login again and obtain new token.";
      return returnErrorRes(res, error_Msg, 401);
    }

    const error_Msg =
      "Your token has invalid please login again and obtain new token.";
    return returnErrorRes(res, error_Msg, 401);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return returnErrorRes(res);
  }
}

async function LoggedINnUserId_matchIN_Db(req, res, next) {
  try {
    const userId = req.userId;
    const validUser = await userModel.exists({ _id: userId });

    if (validUser) {
      return next();
    }
    const error_Msg = "This user not exist";
    return returnErrorRes(res, error_Msg, 401);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return returnErrorRes(res);
  }
}

module.exports = {
  LoggedINnUserToken_Exist,
  LoggedINnUserToken_Verify,
  LoggedINnUserId_matchIN_Db,
};
