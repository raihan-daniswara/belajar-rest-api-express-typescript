import Joi from "joi";
import type { ProductType } from "../types/Product.type";

export const createProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    product_id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().allow("", null),
    size: Joi.string().allow("", null),
  });

  return schema.validate(payload);
};
