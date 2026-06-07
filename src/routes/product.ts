import { Router, type Request, type Response } from "express";

export const productsRouter: Router = Router();

productsRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: `get all products successful`,
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
