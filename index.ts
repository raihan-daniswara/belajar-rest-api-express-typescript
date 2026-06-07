import express, { Application } from "express";
import { routes } from "./src/index";

const app: Application = express();
const port: number = 4000;

routes(app);
app.listen(port, () => console.log(`Server is running at port ${port}`));
