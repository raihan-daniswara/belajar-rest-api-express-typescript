import type { Request, Response } from "express";
import { createUserValidation } from "../validation/auth.validation";
import { v7 as uuidV7 } from "uuid";
import { logger } from "../utils/logger";
import { hashPassword } from "../utils/hashing";
import { createUser } from "../services/auth.service";

export const registeUser = async (req: Request, res: Response) => {
  req.body.user_id = uuidV7();
  const { error, value } = createUserValidation(req.body);
  if (error) {
    logger.error(`ERR: Auth - Register failed: ${error.details[0]?.message}`);
    return res.status(422).json({
      success: false,
      statusCode: 422,
      message: `${error.details[0]?.message}`,
    });
  } else {
    try {
      value.password = `${await hashPassword(value.password)}`;

      await createUser(value);
      return res.status(201).json({
        success: true,
        statusCode: 201,
        message: "Success register user",
      });
    } catch (error) {
      logger.error(`ERR: Auth - Register failed: ${error}`);
      return res.status(422).json({
        success: false,
        statusCode: 422,
        message: `${error}`,
      });
    }
  }
};
