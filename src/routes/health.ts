import { Router, type Request, type Response } from "express";
import { logger } from "../utils/logger";

export const healthRouter: Router = Router();

healthRouter.get("/", (req: Request, res: Response) => {
  logger.info("Health check success");
  res.status(200).json({
    data: {
      status: 200,
      message: `Server Berjalan dengan Lancar`,
    },
  });
});
