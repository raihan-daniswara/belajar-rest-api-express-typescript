import type { Request, Response } from "express";
import {
  createProductValidation,
  updateProductValidation,
} from "../validation/product.validation";
import { logger } from "../utils/logger";
import {
  addProductToDB,
  deleteProductByIdFromDB,
  getProductByIdFromDB,
  getProductFromDB,
  updateProductByIdFromDB,
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
  } else {
    try {
      await addProductToDB(value);
      logger.info("Success add new product");
      return res.status(201).json({
        success: true,
        statusCode: 201,
        message: "Success add new product",
        data: value,
      });
    } catch (error) {
      logger.error(`ERR: Product - Create failed: ${error}`);
      return res.status(422).json({
        success: false,
        statusCode: 422,
        message: `${error}`,
      });
    }
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
      const product = await getProductByIdFromDB(id);

      if (!product) {
        logger.error("Product data not found");
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
    logger.error(`ERR: Product - Get failed: ${error}`);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: `${error}`,
    });
  }
};

export const updateProduct = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const id = req.params.id;
  const { error, value } = updateProductValidation(req.body);
  if (error) {
    logger.error(`ERR: product = create failed: ${error.details[0]?.message}`);
    return res.status(422).json({
      success: false,
      statusCode: 422,
      message: `${error.details[0]?.message}`,
    });
  } else {
    try {
      const data = await updateProductByIdFromDB(id, value);
      if (!data) {
        logger.error("Product data not found");
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: "product data not found",
        });
      } else {
        logger.info("Success update product data");
        return res.status(200).json({
          success: true,
          statusCode: 200,
          message: "Success update product data",
          data: data,
        });
      }
    } catch (error) {
      logger.error(`ERR: Product - Update failed: ${error}`);
      return res.status(422).json({
        success: false,
        statusCode: 422,
        message: `${error}`,
      });
    }
  }
};

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const id = req.params.id;
  try {
    const data = await deleteProductByIdFromDB(id);
    if (!data) {
      logger.error("Product data not found");
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "product data not found",
      });
    } else {
      logger.info("Success delete product data");
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Success delete product data",
      });
    }
  } catch (error) {
    logger.error(`ERR: Product - Delete failed: ${error}`);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: `${error}`,
    });
  }
};
