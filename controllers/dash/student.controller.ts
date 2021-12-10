import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as validate from "validate.js";
import CONFIG from "../../config";
import { User } from "../../src/entity/User";
import { errRes, okRes } from "../../utility/util.service";
import Validator from "../../utility/validation";



export default class StudentController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */

  static async addStudent(req: Request, res: Response): Promise<object> {

    const body = req.body;
    let notValid = validate(body, Validator.addStudent());
    if (notValid) return errRes(res, notValid);

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
    await user.save();
    let token = jwt.sign({ id: user.id }, CONFIG.jwtUserSecret);

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
  static async getStudents(req: Request, res: Response): Promise<object> {
    let id = req.params.id;
    let data = await User.find({ where: { isActive: true, course: id } });
    return okRes(res, { data });
  }
}
