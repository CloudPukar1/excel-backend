import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import cookieParser from "cookie-parser";

import routes from "./routes";
import { errorHandler } from "./middlewares/error-handler.middleware";

const app = express();
const port = 3000;

app
  .use(cors())
  .use(helmet())
  .use(cookieParser())
  .use(express.json())
  .use(morgan("combined"))
  .use(express.static("public"))
  .use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

app.use(errorHandler);

app.listen(port, () => {
  import("./lib/db-connect");
  console.log(`Excel backend listening at port ${port}`);
});
