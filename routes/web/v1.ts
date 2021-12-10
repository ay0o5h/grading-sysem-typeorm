import * as express from "express";
import CourseController from "../../controllers/web/course.controller";
import UserController from '../../controllers/web/user.controller';
import auth from '../../middlewares/web/auth';
import { User } from "../../src/entity/User";
import { errRes, okRes } from "../../utility/util.service";


const multer = require('multer');
// import auth from "../../middlewares/web/auth";

const route = express.Router();
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'images/users',
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
/// Not Auth

route.post("/login", UserController.login);

// route.post('/image', imageUpload.single('image'), (req: any, res) => {
//     console.log(req.file);
//     res.json('/image api');
// });


//  Need Auth
route.use(auth);
route.post("/enroll-course", CourseController.enrollCourse);
route.post("/take-test/:id", CourseController.taketest);
route.post("/result/:id", CourseController.CalucateResult)
route.get("/review/:id", CourseController.Review)
route.get("/profile", UserController.getProfile)
route.post('/image/:id', imageUpload.single('image'), async (req: any, res) => {
    const id = req.params.id;
    let user = await User.findOne(id)
    user.image = req.file.path
    await user.save()
    console.log(req.file)
    return okRes(res, { user })
}, (error, req, res, next) => {
    return errRes(res, { error: error.message })
});


export default route;