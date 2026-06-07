import productModel, { type ProductType } from "../models/product.model";
import { logger } from "../utils/logger";

export const getProductFromDB = async (): Promise<ProductType[]> => {
  try {
    return await productModel.find();
  } catch (error) {
    logger.error(`Cannot get data from MongoDB: \n${error}`);
    throw error;
  }
};
