import * as express from "express";
import AdminController from '../../controllers/dash/admin.controller';
import StudentController from '../../controllers/dash/student.controller';
import CourseController from '../../controllers/dash/course.controller';
import TestController from '../../controllers/dash/test.controller';
import otp from "../../middlewares/dash/otp";
import auth from "../../middlewares/dash/auth";

const route = express.Router();

/// Not Auth && register
route.post("/register", AdminController.register);
route.post("/otp", otp, AdminController.checkOtp);
route.post("/login", AdminController.login);
route.post("/forget/password", AdminController.forget);
route.post("/verify/password", AdminController.verifyPassword);

//  Need Auth
route.use(auth);

route.get("/check", AdminController.check);
// students
route.post("/add/student", StudentController.addStudent);
// courses
route.post("/add/course", CourseController.add);
route.put("/edit/course/:id", CourseController.edit);
route.delete("/delete/course/:id", CourseController.delete);
// tests
route.post("/add/test", TestController.add);
route.put("/edit/test/:id", TestController.edit);
route.delete("/delete/test/:id", TestController.delete);
// questions
route.post("/add/questions", TestController.addQuestion);
route.put("/edit/questions/:id", TestController.editQuestion);
// route.post("/lecture/uploade", CourseController.uploade);


export default route;