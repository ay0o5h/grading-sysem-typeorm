import { Request, Response } from "express";
import * as validate from "validate.js";
import Validator from "../../utility/validation";
import { errRes, okRes } from "../../utility/util.service";
import { Course } from "../../src/entity/Course";
import { Test } from "../../src/entity/Test";
import { Lectures } from "../../src/entity/Lectures";
const multer = require('multer');
export default class CourseController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAll(req: Request, res: Response): Promise<object> {
    const courses = await Course.find({ where: { active: true } });
    return okRes(res, { courses })
  }
  static async getOne(req: Request, res: Response): Promise<object> {
    const id = req.params.id;
    let data = await Course.findOne({
      where: { id, active: true },
      join: {
        alias: "course",
        leftJoinAndSelect: {
          tests: "course.tests",
        },
      },
    });
    return okRes(res, { data });
  }
  static async add(req: Request, res: Response): Promise<object> {
    // get the body
    const body = req.body;
    // validate the req
    let notValid = validate(body, Validator.course());
    if (notValid) return errRes(res, notValid);
    let name = body.name;
    let course;
    course = await Course.findOne({ where: { name } });

    if (course) return errRes(res, ` ${name} is already exist`);

    course = await Course.create({
      ...body
    });

    await course.save();
    // return res
    return okRes(res, { course });
  }
  static async edit(req: Request, res: Response): Promise<object> {
    const body = req.body;
    // validate the req
    let notValid = validate(body, Validator.course(false));
    if (notValid) return errRes(res, notValid);

    const id = req.params.id;
    let data;

    try {
      data = await Course.findOne(id);
      if (!data) return errRes(res, "Not found");

      Object.keys(data).forEach((key) => {
        if (body[key]) data[key] = body[key];
      });

      await data.save();
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, errMsg);
    }
    return okRes(res, { data });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async delete(req: Request, res: Response): Promise<object> {
    const id = req.params.id;
    let data, test;
    try {
      data = await Course.findOne(id);
      test = await Test.find({ where: { course: id } });
      if (!data) return errRes(res, "Not Found");
      data.active = !data.active;
      await data.save();
      for (let i = 0; i < test.length; i++) {
        test[i].active = !test[i].active;
        await test[i].save();
      }
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, errMsg);
    }
    return okRes(res, { data });
  }
  static async uploade(req: any, res): Promise<object> {
    const id = req.params.id;
    const body = req.body;
    let data = await Course.findOne(id);
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "uploads/")
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
      },
    })
    let lect = await Lectures.create({
      name: body.name,
      link: req.file.filename,
      course: body.course,
    });
    return okRes(res, { lect });
  }
}