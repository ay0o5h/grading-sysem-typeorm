import * as express from "express";

import { errRes, okRes } from "../../utility/util.service";

import { Admin } from "../../src/entity/Admin";
import AdminController from '../../controllers/dash/admin.controller';
import CourseController from '../../controllers/dash/course.controller';
import { Lectures } from "../../src/entity/Lectures";
import StudentController from '../../controllers/dash/student.controller';
import TestController from '../../controllers/dash/test.controller';
import auth from "../../middlewares/dash/auth";
import otp from "../../middlewares/dash/otp";

const multer = require('multer');
const route = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
const uploadStorage = multer({ storage: storage })
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'images/admins',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 2000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})
/// Not Auth && register
route.post("/register", AdminController.register);
route.post("/otp", otp, AdminController.checkOtp);
route.post("/login", AdminController.login);
route.post("/forget/password", AdminController.forget);
route.post("/verify/password", AdminController.verifyPassword);

//  Need Auth
route.use(auth);

route.get("/check", AdminController.check);
route.delete("/deactive/", AdminController.deactive);
route.post('/image/:id', imageUpload.single('image'), async (req: any, res) => {
    const id = req.params.id;
    let admin = await Admin.findOne(id)
    admin.image = req.file.path
    await admin.save()
    console.log(req.file)
    return okRes(res, { admin })
}, (error, req, res, next) => {
    return errRes(res, { error: error.message })
});
// students
route.post("/add/student", StudentController.addStudent);
route.delete("/deactive/student/:id", StudentController.deactiveStudent);

// courses
route.get("/courses/:id", CourseController.getAll);
route.get("/course/:id", CourseController.getOne);
route.post("/add/course", CourseController.add);
route.put("/edit/course/:id", CourseController.edit);
route.delete("/delete/course/:id", CourseController.delete);
route.get("/course/lectures/:id", CourseController.getLecture);
route.post("/upload/:id", uploadStorage.single("file"), async (req: any, res) => {
    const id = req.params.id;
    let letc = Lectures.create({
        name: req.file.filename,
        link: req.file.path,
        course: id
    })
    await letc.save()
    console.log(req.file)
    return okRes(res, { letc })
})
route.put("/upload/:id", uploadStorage.single("file"), async (req: any, res) => {
    const id = req.params.id;
    let lec = await Lectures.findOne(id)
    lec.name = req.file.filename;
    lec.link = req.file.path
    await lec.save()
    console.log(req.file)
    return okRes(res, { lec })
})

route.delete("/delete/lecture/:id", CourseController.deleteLect);
// tests
route.get("/test/:id", TestController.getOne);
route.get("/:id/test", TestController.getAll);
route.post("/add/test", TestController.add);
route.put("/edit/test/:id", TestController.edit);
route.delete("/delete/test/:id", TestController.delete);
// questions
route.post("/add/questions", TestController.addQuestion);
route.put("/edit/questions/:id", TestController.editQuestion);

export default route;