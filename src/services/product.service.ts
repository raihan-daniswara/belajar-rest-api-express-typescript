import productModel from "../models/product.model";
import type { ProductType } from "../types/Product.type";
import { logger } from "../utils/logger";

export const addProductToDB = async (payload: ProductType) => {
  return await productModel.create(payload);
};
export const getProductFromDB = async (): Promise<ProductType[]> => {
  try {
    return await productModel.find();
  } catch (error) {
    logger.error(`Cannot get data from MongoDB: \n${error}`);
    throw error;
  }
};
export const getProductbyIdFromDB = async (id: string) => {
  try {
    return await productModel.findOne({ product_id: id });
  } catch (error) {
    logger.error(`Cannot get data from MongoDB: \n${error}`);
    throw error;
  }
};
