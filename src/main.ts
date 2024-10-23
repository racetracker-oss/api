import express from "express";
import { initRoutes } from "./routes";
import { initConfig } from "./configs";
import { env } from "./env";

const app = express();

initConfig(app);
initRoutes(app);

const port = env.PORT || 3333;

app.listen(port, () => {
  console.info(`Listening at http://localhost:${port}`);
});
