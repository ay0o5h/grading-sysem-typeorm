import "reflect-metadata";
import * as validate from "validate.js";
import { StudentAnswer } from "../../src/entity/StudentAnswer";
import { TestQuestion } from "../../src/entity/TestQuestion";
import { TestResult } from "../../src/entity/TestResult";
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
        let body = req.body;
        let notValid = validate(body, Validator.enrollCourse());
        if (notValid) return errRes(res, notValid);
        let id = body.courseId;
        let course = await Course.findOne({ where: { id } });
        if (!course) return errRes(res, `${id} is not exist`);
        const course1 = new Course();
        course1.id = body.courseId;
        course1.save();
        const user = new User();
        user.id = req.user.id;
        user.courses = [course1];
        await user.save();

        return okRes(res, { user, course1 });
    }
    static async taketest(req, res): Promise<object> {
        const id = req.params.id;
        const user = req.user.id
        let body = req.body;
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
                user: user,
                testQuestion: item.question,
                answer: item.answer
            })
            await data.save();
        }
        return okRes(res, { data });
    }
    static async CalucateResult(req, res): Promise<object> {

        const id = req.params.id;
        const user = req.user.id;
        let body = req.body;
        let answers = [];
        let studentAnswers = [];

        let test = await Test.findOne({ where: { id } });
        if (!test) return errRes(res, `${test} is not exist`);
        let testQ = await TestQuestion.find({ where: { test: id } });
        let studentAnswer = await StudentAnswer.find({ where: { test: id, user } });
        testQ.map((c) => answers.push(c.right_answer))
        studentAnswer.map((c) => studentAnswers.push(c.answer))
        let score = body.score;
        let finalResult = 0;
        if (answers.length !== studentAnswers.length) return errRes(res, { msg: "something wnt wrong" });
        for (var i = 0, len = answers.length; i < len; i++) {
            if (answers[i] === studentAnswers[i]) {
                score = score + 1;
                finalResult = test.mark_of_each_question * score
            }
        }

        let data = await TestResult.create({
            result: finalResult,
            no_of_right_qsn: score,
            test: id,
            user
        })
        await data.save()
        return okRes(res, { data });
    }
    static async Review(req, res): Promise<object> {

        const id = req.params.id;
        const user = req.user.id;
        let test = await Test.findOne({ where: { id } });
        if (!test) return errRes(res, `${test} is not exist`);
        let testQ = await TestQuestion.find({ where: { test: id } });
        let studentAnswer = await StudentAnswer.find({ where: { test: id, user: user } });


        return okRes(res, { data: { testQ, studentAnswer } });
    }
}
