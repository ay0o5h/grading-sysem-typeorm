import * as express from "express";
import UserController from '../../controllers/web/user.controller';

// import auth from "../../middlewares/web/auth";

const route = express.Router();

/// Not Auth

route.post("/login", UserController.login);



//  Need Auth
// route.use(auth);



export default route;