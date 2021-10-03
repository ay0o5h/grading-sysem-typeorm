import { Request, Response } from "express";
import * as validate from "validate.js";
import Validator from "../../utility/validation";
import { errRes, okRes } from "../../utility/util.service";
import { Course } from "../../src/entity/Course";
import * as imgbbUploader from "imgbb-uploader";
import * as fs from "fs";
import CONFIG from "../../config";
export default class CourseController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
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
    let data;

    try {
      data = await Course.findOne(id);
      if (!data) return errRes(res, "Not Found");
      data.active = !data.active;
      await data.save();
    } catch (error) {
      let errMsg = error.detail ? error.detail : error;
      return errRes(res, errMsg);
    }
    return okRes(res, { data });
  }
  static async uploade(req: any, res: Response): Promise<object> {
    console.log(req.file)
    if (!req.file) return errRes(res, `Image is missing`);

    let image = req.files.image;
    let fileName = "image";
    let path = `./public/${fileName}.png`;
    image.mv(path, function (err) {
      if (err) return errRes(res, err);
      imgbbUploader(CONFIG.imageBB, path)
        .then((r) => {
          fs.unlink(path, (error) => errRes(res, error));
          return okRes(res, r);
        })
        .catch((error) => console.error(1));
    });

  }
}
