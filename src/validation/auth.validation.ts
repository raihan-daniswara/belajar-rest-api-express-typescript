import Joi from "joi";
import type UserType from "../types/user.type";

export const createUserValidation = (payload: UserType) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required().min(6),
    role: Joi.string().allow("", null),
  });

  return schema.validate(payload);
};

export const createSessionValidation = (payload: UserType) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(payload);
};

export const refreshSessionValidation = (payload: UserType) => {
  const schema = Joi.object({
    refresh_token: Joi.string().required(),
  });

  return schema.validate(payload);
};
