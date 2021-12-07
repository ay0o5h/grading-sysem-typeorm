import "reflect-metadata";
import { User } from "../../src/entity/User";
import { errRes, okRes } from "../../utility/util.service";
import { Course } from './../../src/entity/Course';



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
        // let notValid = validate(body, Validator.enrollCourse());
        // if (notValid) return errRes(res, notValid);
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
}