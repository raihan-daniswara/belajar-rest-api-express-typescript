import type { Request, Response } from "express";
import { createProductValidation } from "../validation/product.validation";
import { logger } from "../utils/logger";

export const createProduct = (req: Request, res: Response) => {
  const { error, value } = createProductValidation(req.body);
  if (error) {
    logger.error(`ERR: product = create failed: ${error.details[0]?.message}`);
    return res.status(422).json({
      success: false,
      statusCode: 422,
      message: `${error.details[0]?.message}`,
    });
  }
  logger.info("Success add new product");
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Success add new product",
    data: value,
  });
};

export const getProduct = (req: Request, res: Response) => {
  const products = [
    {
      id: 1,
      name: "Sepatu Sekolah",
      price: 220000,
    },
    {
      id: 2,
      name: "Tas Sekolah",
      price: 480000,
    },
    {
      id: 3,
      name: "Baju Sekolah",
      price: 300000,
    },
  ];

  const paramId: number = Number(req.params.id);

  if (paramId) {
    const findProduct = products.find((product) => {
      return product.id === paramId;
    });

    if (!findProduct) {
      logger.info("Product not found");
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Product not found",
      });
    }

    logger.info("Success get product data");
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Success get all product data",
      data: findProduct,
    });
  } else {
    logger.info("Success get all product data");
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Success get all product data",
      data: products,
    });
  }
};
