"use strict";

const { returnErrorRes } = require("../../../Helpers");
const userModel = require("../../../Model/User/Create_user.");

async function getUserPersonalInfo(req, res, next) {
  try {
    const userId = req.userId;
    const getUSerInfo = await userModel.findById({ _id: userId });
    // # Assign properties from getUSerInfo to userInfo object
    const { name, email } = getUSerInfo;
    req.userInfo = { name, email };
    return next();
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return returnErrorRes(res);
  }
}

module.exports = { getUserPersonalInfo };
