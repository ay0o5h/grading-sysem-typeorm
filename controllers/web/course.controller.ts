import "reflect-metadata";
import * as validate from "validate.js";
import { StudentAnswer } from "../../src/entity/StudentAnswer";
import { User } from "../../src/entity/User";
import { errRes, okRes } from "../../utility/util.service";
import Validator from "../../utility/validation";
import { Course } from './../../src/entity/Course';
import { Test } from './../../src/entity/Test';


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
        let id = body.courseId;
        let course = await Course.findOne({ where: { id } });
        if (!course) return errRes(res, `${id} is not exist`);
        // TODO: enroll Course
        const course1 = new Course();
        course1.id = body.courseId;
        course1.save();
        const user = new User();
        user.id = body.userId;

        user.courses = [course1];
        await user.save();

        return okRes(res, { user, course1 });
    }
    static async taketest(req, res): Promise<object> {
        // get body
        const id = req.params.id;
        let body = req.body;
        // verify body
        let notValid = validate(body, Validator.taketest());
        if (notValid) return errRes(res, notValid);

        let test = await Test.findOne({ where: { id } });
        if (!test) return errRes(res, `${test} is not exist`);
        let items = [];
        for (const item of body.answers) {
            let notValid = validate(item, Validator.checkQuestion());
            if (notValid) return errRes(res, notValid);

            items.push({ question: item.question, answer: item.answer });
        }
        let data
        for (const item of items) {
            data = StudentAnswer.create({
                test: id,
                user: body.user,
                testQuestion: item.question,
                answer: item.answer
            })


            await data.save();

        }

        // TODO: enroll Course

        return okRes(res, { data });
    }
}