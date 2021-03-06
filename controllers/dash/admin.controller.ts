import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Twilio } from "twilio";
import * as validate from "validate.js";
import CONFIG from "../../config";
import { Admin } from "../../src/entity/Admin";
import PhoneFormat from "../../utility/phoneFormat.service";
import { errRes, getOtp, okRes } from "../../utility/util.service";
import Validator from "../../utility/validation";



export default class AdminController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async register(req: Request, res: Response): Promise<object> {
    // get the body
    const body = req.body;
    // validate the req
    let notValid = validate(body, Validator.register());
    if (notValid) return errRes(res, notValid);

    // format to the number
    let phoneObj = PhoneFormat.getAllFormats(body.phone);
    if (!phoneObj.isNumber)
      return errRes(res, `Phone ${body.phone} is not valid`);

    body.phone = phoneObj.globalP;
    let phone = phoneObj.globalP;

    // hash the password
    let salt = await bcrypt.genSalt(12);
    let password = await bcrypt.hash(body.password, salt);
    // create otp
    let otp = getOtp();
    body.password = password;
    body.otp = otp;

    // check if the user already exists
    let admin;
    admin = await Admin.findOne({ where: { phone } });
    // if exists but not verified
    if (admin) {
      if (!admin.isVerfied) {
        Object.keys(body).forEach((key) => {
          admin[key] = body[key];
        });
      } else return errRes(res, `admin ${phone} is already exist`);
    } else {
      admin = await Admin.create({
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        password: body.password,
        otp: body.otp,
      });
    }

    // save the user
    await admin.save();

    // send sms
    const accountSid = "AC1ec944609532d00468cecce1145b5575";
    const authToken = "cb6f14425becfcea726e09609b765829";
    const client = new Twilio(accountSid, authToken);
    client.messages
      .create({
        body: `your vervication code is ${otp}`,
        to: '+9647805847657',
        from: "+18066066506"
      })
      .then(message => console.log(message.sid))
    let token = jwt.sign({ id: admin.id }, CONFIG.jwtUserSecret);

    // return res
    return okRes(res, { token });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async checkOtp(req, res): Promise<object> {
    // get the otp from body
    let body = req.body;
    let otp = body.otp;
    if (!otp) return errRes(res, `Otp is required`);
    // check if they are the same DB
    let admin = req.admin;


    // if not -> delete the otp from DB + ask user to try again
    if (admin.otp != otp) {
      admin.otp = null;
      await admin.save();
      return errRes(res, "otp is incorrect");
    }


    // if yes -> isVerified = true
    admin.isVerfied = true;
    await admin.save();
    // return res
    return okRes(res, { admin });
  }

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
    let notValid = validate(body, Validator.login());
    if (notValid) return errRes(res, notValid);

    // format to the number
    let phoneObj = PhoneFormat.getAllFormats(body.phone);
    if (!phoneObj.isNumber)
      return errRes(res, `Phone ${body.phone} is not valid`);

    let phone = phoneObj.globalP;
    let password = body.password;
    // get admin from db by phone + isVerified
    let admin = await Admin.findOne({ where: { phone, isVerfied: true } });
    if (!admin) return errRes(res, `Please complete the registration process`);

    // compaire the password
    let check = await bcrypt.compare(password, admin.password);
    if (!check) return errRes(res, "Incorrect credentials");

    // token
    let token = jwt.sign({ id: admin.id }, CONFIG.jwtUserSecret);

    // return token
    return okRes(res, { token, admin });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async check(req, res) {
    return okRes(res, { msg: "you are logged in" });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async forget(req, res) {

    let body = req.body;

    let notValid = validate(body, Validator.forget());
    if (notValid) return errRes(res, notValid);

    // format phone
    let phoneObj = PhoneFormat.getAllFormats(body.phone);
    if (!phoneObj.isNumber)
      return errRes(res, `Phone ${body.phone} is not valid`);

    let phone = phoneObj.globalP;

    // get admin from db using phone + isVerified
    let admin = await Admin.findOne({
      where: { phone, isVerfied: true, isActive: true },
    });
    if (!admin) return errRes(res, `Please complete the registration process`);

    // create passwordOtp & save
    let otpNewPassword = getOtp();

    admin.otpNewPassword = otpNewPassword;
    await admin.save();

    // create token
    let token = jwt.sign({ phone: admin.phone }, CONFIG.jwtPasswordSecret);

    return okRes(res, { token });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async verifyPassword(req, res) {
    // validate
    let body = req.body;

    let notValid = validate(body, Validator.verifyPassword());
    if (notValid) return errRes(res, notValid);

    // get the token
    let token = req.headers.token;
    let phone;
    // get the user from db using id
    try {
      let payload;
      payload = jwt.verify(token, CONFIG.jwtPasswordSecret);
      phone = payload.phone;
    } catch (error) {
      return errRes(res, "Invalid token");
    }

    let admin = await Admin.findOne({ where: { phone } });
    if (!admin) return errRes(res, "admin not found");

    // compaire the passwordOtp from db & body
    if (body.passwordOtp != admin.otpNewPassword)
      return errRes(res, "invalid one time password");

    // hash new password
    let salt = await bcrypt.genSalt(12);
    let password = await bcrypt.hash(body.newPassword, salt);

    // save new password
    admin.password = password;
    return okRes(res, { msg: "All good" });
  }
  static async deactive(req, res): Promise<object> {
    const token = req.headers.token;
    if (!token) return errRes(res, "You need to register");
    let data;
    try {
      let payload: any;
      payload = jwt.verify(token, CONFIG.jwtUserSecret);
      data = await Admin.findOne({ where: { id: payload.id } });
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
