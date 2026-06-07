import { Router, type Request, type Response } from "express";
import { logger } from "../utils/logger";

export const productsRouter: Router = Router();

productsRouter.get("/", (req: Request, res: Response) => {
  logger.info("Success get all product data");
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: `Success get all product data`,
    data: [
      {
        id: 1,
        name: "Sepatu Sport",
        price: 500000,
      },
      {
        id: 2,
        name: "Botol Minum",
        price: 82000,
      },
      {
        id: 3,
        name: "Tas Sekolah",
        price: 267000,
      },
    ],
  });
});

productsRouter.post("/", (req: Request, res: Response) => {
  logger.info("Success add new product");
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Success add new product",
    data: req.body,
  });
});
