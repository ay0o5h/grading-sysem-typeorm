import * as express from "express";
import AdminController from '../../controllers/dash/admin.controller';
import StudentController from '../../controllers/dash/student.controller';
import otp from "../../middlewares/dash/otp";
import auth from "../../middlewares/dash/auth";

const route = express.Router();

/// Not Auth
route.post("/register", AdminController.register);
route.post("/otp", otp, AdminController.checkOtp);
route.post("/login", AdminController.login);

route.post("/forget/password", AdminController.forget);
route.post("/verify/password", AdminController.verifyPassword);

route.post("/add/student", StudentController.addStudent);
//  Need Auth
route.use(auth);

route.get("/check", AdminController.check);



export default route;