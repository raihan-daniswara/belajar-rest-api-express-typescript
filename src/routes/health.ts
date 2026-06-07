import { Router, type Request, type Response } from "express";

export const healthRouter: Router = Router();

healthRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    data: {
      status: 200,
      message: `Server Berjalan dengan Lancar`,
    },
  });
});
