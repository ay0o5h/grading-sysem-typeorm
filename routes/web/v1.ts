// import * as express from "express";
// import UserController from '../../controllers/web/user.controller';
// import otp from "../../middlewares/web/otp";
// import auth from "../../middlewares/web/auth";

// const route = express.Router();

// /// Not Auth
// route.post("/register", UserController.register);
// route.post("/otp", otp, UserController.checkOtp);
// route.post("/login", UserController.login);

// route.post("/forget/password", UserController.forget);
// route.post("/verify/password", UserController.verifyPassword);


// //  Need Auth
// route.use(auth);

// route.get("/check", UserController.check);

// export default route;