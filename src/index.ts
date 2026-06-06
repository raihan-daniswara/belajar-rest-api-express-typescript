import express, {
  type Application,
  type Request,
  type Response,
} from "express";

const app: Application = express();

const port: number = 4000;

app.use("/health", (req: Request, res: Response) => {
  res.status(200).send({
    status: 200,
  });
});

app.listen(port, () => console.log(`server is listening on port ${port}`));
