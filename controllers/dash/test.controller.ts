import { Request, Response } from "express";
import * as validate from "validate.js";
import Validator from "../../utility/validation";
import { errRes, okRes } from "../../utility/util.service";
import { Course } from "../../src/entity/Course";
import * as imgbbUploader from "imgbb-uploader";
import * as fs from "fs";
import CONFIG from "../../config";
import { Test } from "../../src/entity/Test";
import { TestQuestion } from "../../src/entity/TestQuestion";
export default class TestController {
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
        let notValid = validate(body, Validator.test());
        if (notValid) return errRes(res, notValid);
        let name = body.name;
        let test;
        test = await Test.findOne({ where: { name, active: true } });

        if (test) return errRes(res, ` ${name} is already exist`);

        test = await Test.create({
            ...body
        });

        await test.save();
        // return res
        return okRes(res, { test });
    }
    static async edit(req: Request, res: Response): Promise<object> {
        const body = req.body;
        // validate the req
        let notValid = validate(body, Validator.test(false));
        if (notValid) return errRes(res, notValid);

        const id = req.params.id;
        let data;

        try {
            data = await Test.findOne(id);
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
        let tests, testQsns;
        testQsns = await TestQuestion.find({ where: { test: id } });
        for (let i = 0; i < testQsns.length; i++) {
            await testQsns[i].remove();
        }


        tests = await Test.delete(id);

        return okRes(res, 'test has been deleted');
    }
    static async addQuestion(req: Request, res: Response): Promise<object> {
        // get the body
        const body = req.body;
        // validate the req
        let notValid = validate(body, Validator.testQuestion());
        if (notValid) return errRes(res, notValid);
        let qsn = body.qsn;
        let test;
        test = await TestQuestion.findOne({ where: { qsn } });

        if (test) return errRes(res, ` ${qsn} is already exist`);

        test = await TestQuestion.create({
            ...body
        });

        await test.save();
        // return res
        return okRes(res, { test });
    }
    static async editQuestion(req: Request, res: Response): Promise<object> {
        const body = req.body;
        // validate the req
        let notValid = validate(body, Validator.testQuestion(false));
        if (notValid) return errRes(res, notValid);

        const id = req.params.id;
        let data;

        try {
            data = await TestQuestion.findOne(id);
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

}
