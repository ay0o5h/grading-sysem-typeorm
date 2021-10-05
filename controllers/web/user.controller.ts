import { Request, Response } from "express";
import { User } from "../../src/entity/User";
import * as validate from "validate.js";
import Validator from "../../utility/validation";
import { errRes, getOtp, okRes } from "../../utility/util.service";
import PhoneFormat from "../../utility/phoneFormat.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import CONFIG from '../../config';

export default class UserController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  /** 
   *
   * @param req
   * @param res
   * @returns
   */
  static async login(req, res): Promise<object> {
    // get body
    let body = req.body;
    // verify body
    let notValid = validate(body, Validator.loginStudent());
    if (notValid) return errRes(res, notValid);


    let email = body.email;
    let password = body.password;
    // get user from db by phone + isVerified
    let user = await User.findOne({ where: { email, isActive: true } });
    if (!user) return errRes(res, `the email ${email} is not exist or the account is deactive by the admin`);

    // compaire the password
    let check = await bcrypt.compare(password, user.password);
    if (!check) return errRes(res, "Incorrect credentials");

    // token
    let token = jwt.sign({ id: user.id }, CONFIG.jwtUserSecret);

    // return token
    return okRes(res, { token, user });
  }
}