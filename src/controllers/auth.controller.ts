import type { Request, Response } from "express";
import {
  createSessionValidation,
  createUserValidation,
} from "../validation/auth.validation";
import { v7 as uuidV7 } from "uuid";
import { logger } from "../utils/logger";
import { checkPassword, hashPassword } from "../utils/hashing";
import { createUser, findUserByEmail } from "../services/auth.service";
import { signJWT } from "../utils/jwt";

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

export const createSession = async (req: Request, res: Response) => {
  const { error, value } = createSessionValidation(req.body);
  if (error) {
    logger.error(
      `ERR: Auth - Create Session failed: ${error.details[0]?.message}`,
    );
    return res.status(422).json({
      success: false,
      statusCode: 422,
      message: `${error.details[0]?.message}`,
    });
  } else {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user: any = await findUserByEmail(value.email);
      const isValid = await checkPassword(value.password, user.password);

      if (!isValid) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: "Invalid email or password",
        });
      } else {
        const accessToken = signJWT({ ...user }, { expiresIn: "1d" });

        return res.status(200).json({
          success: true,
          statusCode: 200,
          message: "Login Success",
          data: { accessToken: accessToken },
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      logger.error(`ERR: Auth - Create Session failed: ${error.message}`);
      return res.status(422).json({
        success: false,
        statusCode: 422,
        message: `${error.message}`,
      });
    }
  }
};
