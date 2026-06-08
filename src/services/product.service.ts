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
export const getProductByIdFromDB = async (id: string) => {
  try {
    return await productModel.findOne({ product_id: id });
  } catch (error) {
    logger.error(`Cannot get data from MongoDB: \n${error}`);
    throw error;
  }
};
export const updateProductByIdFromDB = async (
  id: string,
  payload: ProductType,
) => {
  try {
    return await productModel.findOneAndUpdate(
      { product_id: id },
      { $set: payload },
    );
  } catch (error) {
    logger.error(`Cannot update data from MongoDB: \n${error}`);
    throw error;
  }
};
export const deleteProductByIdFromDB = async (id: string) => {
  try {
    return await productModel.findOneAndDelete({ product_id: id });
  } catch (error) {
    logger.error(`Cannot delete data from MongoDB: \n${error}`);
    throw error;
  }
};
