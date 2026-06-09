import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { routes } from "../routes/index";
import bodyParser from "body-parser";
import cors from "cors";
import deserializeToken from "../middleware/deserializedToken";

const createServer = () => {
  const app: Application = express();

  // parse body request
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // cors access handler
  app.use(cors());
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
  });

  app.use(deserializeToken);

  routes(app);
  return app;
};

export default createServer;
