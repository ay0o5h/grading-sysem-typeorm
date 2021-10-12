import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
const app = express();
import webv1 from "../routes/web/v1";
import dashv1 from "../routes/dash/v1";
import notFound from "../middlewares/web/notFound";

const port = process.env.PORT || 3000;



createConnection()
  .then(async (connection) => {
    app.use(express.json());
    app.use("/v1", webv1);
    app.use("/dash/v1", dashv1);
    app.use(notFound);
    app.listen(port, () => console.log(`Running on ${port}`));
  })
  .catch((error) => console.log(error));
