import type { Request, Response } from "express";
import { createProductValidation } from "../validation/product.validation";
import { logger } from "../utils/logger";
import {
  addProductToDB,
  getProductbyIdFromDB,
  getProductFromDB,
} from "../services/product.service";
import { v7 as uuidV7 } from "uuid";

export const createProduct = async (req: Request, res: Response) => {
  req.body.product_id = uuidV7();
  const { error, value } = createProductValidation(req.body);
  if (error) {
    logger.error(`ERR: product = create failed: ${error.details[0]?.message}`);
    return res.status(422).json({
      success: false,
      statusCode: 422,
      message: `${error.details[0]?.message}`,
    });
  }
  try {
    await addProductToDB(value);
    logger.info("Success add new product");
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Success add new product",
      data: value,
    });
  } catch (error) {
    logger.error(`ERR: product = create failed: ${error}`);
    return res.status(422).json({
      success: false,
      statusCode: 422,
      message: `${error}`,
    });
  }
};

export const getProduct = async (
  req: Request<{ id?: string }>,
  res: Response,
) => {
  try {
    const products = await getProductFromDB();
    const id = req.params.id;

    if (id) {
      const product = await getProductbyIdFromDB(id);

      if (!product) {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: "product data not found",
        });
      }
      logger.info("Success get product data");
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Success get product data",
        data: product,
      });
    }

    logger.info("Success get all product data");
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Success get all product data",
      data: products,
    });
  } catch (error) {
    logger.error(error);

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};
