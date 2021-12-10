import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as validate from "validate.js";
import CONFIG from '../../config';
import { User } from "../../src/entity/User";
import { errRes, okRes } from "../../utility/util.service";
import Validator from "../../utility/validation";

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

    let body = req.body;
    let notValid = validate(body, Validator.loginStudent());
    if (notValid) return errRes(res, notValid);


    let email = body.email;
    let password = body.password;
    let user = await User.findOne({ where: { email, isActive: true } });
    if (!user) return errRes(res, `the email ${email} is not exist or the account is deactive by the admin`);

    let check = await bcrypt.compare(password, user.password);
    if (!check) return errRes(res, "Incorrect credentials");

    let token = jwt.sign({ id: user.id }, CONFIG.jwtUserSecret);

    return okRes(res, { token, user });
  }

  static async getProfile(req, res): Promise<object> {
    let user = await User.findOne({ where: { id: req.user.id, isActive: true } });
    if (!user) return errRes(res, `the user is not exist or the account is deactive by the admin`);
    return okRes(res, { user });
  }

}