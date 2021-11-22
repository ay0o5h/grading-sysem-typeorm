import * as validate from "validate.js";
import { Course } from "../../src/entity/Course";
import { errRes, okRes } from "../../utility/util.service";
import Validator from "../../utility/validation";



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