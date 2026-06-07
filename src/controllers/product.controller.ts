import type { Request, Response } from "express";
import { createProductValidation } from "../validation/product.validation";
import { logger } from "../utils/logger";
import { getProductFromDB } from "../services/product.service";
import type { ProductType } from "../models/product.model";

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

export const getProduct = async (req: Request, res: Response) => {
  try {
    const products = await getProductFromDB();
    const paramName = req.params.name;

    if (paramName) {
      const findProduct = products.find((product: ProductType) => {
        return product.name === paramName;
      });

      if (!findProduct) {
        logger.error("Product not found");
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
        message: "Success get product data",
        data: findProduct,
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
// if (paramId) {
//   const findProduct = products.find((product) => {
//     return product.id === paramId;
//   });

//   if (!findProduct) {
//     logger.info("Product not found");
//     return res.status(404).json({
//       success: false,
//       statusCode: 404,
//       message: "Product not found",
//     });
//   }

//   logger.info("Success get product data");
//   return res.status(200).json({
//     success: true,
//     statusCode: 200,
//     message: "Success get all product data",
//     data: findProduct,
//   });
// } else {
//   logger.info("Success get all product data");
//   return res.status(200).json({
//     success: true,
//     statusCode: 200,
//     message: "Success get all product data",
//     data: products,
//   });
// }
