"use strict";

const jwt = require("jsonwebtoken");

function returnErrorRes(res, error_Msg, status_Code) {
  try {
    const success = false;
    const status = "Error";
    const code = status_Code || 500;
    const msg = error_Msg || "An error occurred on the server. Please try agin";
    return res.status(code).json({
      success,
      status,
      code,
      msg,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
  }
}

function returnSuccessRes(res, successMsg, payload) {
  try {
    const success = true;
    const status = "Success";
    const code = 200;
    const msg = successMsg || "Success";
    return res.status(code).json({
      success,
      status,
      code,
      msg,
      payload,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
  }
}

async function createJwtToken(data, setExpire, SIGNATURE) {
  const JWT_Token = jwt.sign(
    {
      data,
    },
    SIGNATURE,
    { expiresIn: setExpire }
  );
  return JWT_Token;
}

async function verify_JWT(token, signature) {
  try {
    let jwtSuccess = false;
    let decoded = null;
    let data = {
      jwtSuccess,
      decoded,
    };

    const decodedToken = await jwt.verify(
      token,
      signature,
      function (err, decoded) {
        if (!err) {
          jwtSuccess = true;

          return (data = { jwtSuccess, decoded });
        }
        return (data = { jwtSuccess, decoded: err.message });
      }
    );
    return decodedToken;
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return error;
  }
}

module.exports = {
  returnErrorRes,
  returnSuccessRes,
  createJwtToken,
  verify_JWT,
};
