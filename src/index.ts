import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();
const port = 3000;

app.use(cors());

app.use("/api/v1", routes);

app.listen(port, () => {
  import("./lib/db-connect");
  console.log(`Excel backend listening at port ${port}`);
});
