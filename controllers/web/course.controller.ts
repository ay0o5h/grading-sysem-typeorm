import { Request, Response } from "express";
import { User } from "../../src/entity/User";
import * as validate from "validate.js";
import Validator from "../../utility/validation";
import { errRes, getOtp, okRes } from "../../utility/util.service";
import PhoneFormat from "../../utility/phoneFormat.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import CONFIG from '../../config';
import { Course } from "../../src/entity/Course";

export default class CourseController {

    /** 
     *
     * @param req
     * @param res
     * @returns
     */
    static async enrollCourse(req, res): Promise<object> {
        // get body
        let body = req.body;
        // verify body
        let notValid = validate(body, Validator.enrollCourse());
        if (notValid) return errRes(res, notValid);
        let name = body.name;
        let course = await Course.findOne({ where: { name } });
        if (!course) return errRes(res, `${name} is not exist`);
        // TODO: enroll Course
        // test = await TestQuestion.create({
        //     ...body
        // });

        // await test.save();
        // // return res
        // return okRes(res, { test });
        // return token
        return okRes(res, { course });
    }
}