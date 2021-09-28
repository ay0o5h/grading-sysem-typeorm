import { errRes } from "../../utility/util.service";
import * as jwt from "jsonwebtoken";
import CONFIG from "../../config";
import { Admin } from "../../src/entity/Admin";

export default async (req, res, next) => {
  // get the token
  const token = req.headers.token;
  if (!token) return errRes(res, "You need to register");
  // verify token

  try {
    let payload: any;
    payload = jwt.verify(token, CONFIG.jwtUserSecret);
    // get user
    let admin = await Admin.findOne(payload.id);
    // check user isVerified
    if (admin.isVerfied) return errRes(res, `You are already verified`);
    req.admin = admin;
    // next
    return next();
  } catch (error) {
    return errRes(res, error);
  }
};