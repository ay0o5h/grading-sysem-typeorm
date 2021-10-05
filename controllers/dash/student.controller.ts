import { Request, Response } from "express";
import * as validate from "validate.js";
import Validator from "../../utility/validation";
import { errRes, okRes } from "../../utility/util.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import CONFIG from "../../config";
import { User } from "../../src/entity/User";
export default class StudentController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async addStudent(req: Request, res: Response): Promise<object> {
    // get the body
    const body = req.body;
    // validate the req
    let notValid = validate(body, Validator.addStudent());
    if (notValid) return errRes(res, notValid);
    // hash the password
    let salt = await bcrypt.genSalt(12);
    let password = await bcrypt.hash(body.password, salt);
    body.password = password;
    let email = body.email;
    // check if the user already exists
    let user;
    user = await User.findOne({ where: { email } });
    // if exists but not verified
    if (user) return errRes(res, `student ${email} is already exist`);
    user = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password,
    });
    // save the user
    await user.save();
    let token = jwt.sign({ id: user.id }, CONFIG.jwtUserSecret);
    // return res
    return okRes(res, { user, token });
  }
  static async deactiveStudent(req: Request, res: Response): Promise<object> {
    const id = req.params.id;
    let data;
    try {
      data = await User.findOne(id);
      if (!data) return errRes(res, "Not Found");
      data.isActive = !data.isActive;
      await data.save();
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, errMsg);
    }
    return okRes(res, { data });
  }


}
