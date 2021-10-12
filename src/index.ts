import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
const app = express();
import webv1 from "../routes/web/v1";
import dashv1 from "../routes/dash/v1";
import notFound from "../middlewares/web/notFound";
const multer = require('multer');
const port = process.env.PORT || 3000;
// const imageUpload = multer({
//   dest: 'images',
// });
// const fileUpload = multer({
//   dest: 'files',
// });


createConnection()
  .then(async (connection) => {
    app.use(express.json());
    //   app.post('/image', imageUpload.single('image'), (req: any, res) => {
    //     console.log(req.file);
    //     res.json('/image api');
    //   });
    //   app.get('/image/:filename', (req, res) => {
    //     const { filename } = req.params;
    //     const dirname = path.resolve();
    //     const fullfilepath = path.join(dirname, 'images/' + filename);
    //     return res.sendFile(fullfilepath);
    // });
    app.use("/v1", webv1);
    app.use("/dash/v1", dashv1);
    app.use(notFound);
    app.listen(port, () => console.log(`Running on ${port}`));
  })
  .catch((error) => console.log(error));
