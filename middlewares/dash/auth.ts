import * as jwt from "jsonwebtoken";
import CONFIG from "../../config";
import { Admin } from "../../src/entity/Admin";
import { errRes } from "../../utility/util.service";


export default async (req, res, next) => {
  // get the token
  const token = req.headers.token;
  if (!token) return errRes(res, "You need to register");
  // verify token

  try {
    let payload: any;
    payload = jwt.verify(token, CONFIG.jwtUserSecret);
    // get user
    let admin = await Admin.findOne({ where: { id: payload.id, isActive: true } });
    console.log({ admin, payload });

    // check user isVerified
    if (!admin.isVerfied) return errRes(res, `Please verify your account`);
    if (!admin.isActive) return errRes(res, `the account is not active`);
    req.admin = admin;
    // next
    return next();
  } catch (error) {
    return errRes(res, "invalid token");
  }
};