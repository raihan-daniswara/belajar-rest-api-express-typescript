import type { Request, Response } from "express";
import {
  createSessionValidation,
  createUserValidation,
  refreshSessionValidation,
} from "../validation/auth.validation";
import { v7 as uuidV7 } from "uuid";
import { logger } from "../utils/logger";
import { checkPassword, hashPassword } from "../utils/hashing";
import { createUser, findUserByEmail } from "../services/auth.service";
import { signJWT, verifyJWT } from "../utils/jwt";

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
        // const accessToken = signJWT({ ...user }, { expiresIn: "5s" }); // debug

        const refreshToken = signJWT({ ...user }, { expiresIn: "1y" });

        return res.status(200).json({
          success: true,
          statusCode: 200,
          message: "Login Success",
          data: {
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
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

export const refreshSession = async (req: Request, res: Response) => {
  const { error, value } = refreshSessionValidation(req.body);
  if (error) {
    logger.error(
      `ERR: Auth - Refresh Session failed: ${error.details[0]?.message}`,
    );
    return res.status(422).json({
      success: false,
      statusCode: 422,
      message: `${error.details[0]?.message}`,
    });
  } else {
    try {
      const { decoded } = verifyJWT(value.refresh_token);

      const user = await findUserByEmail(decoded._doc.email);
      if (!user) {
        return false;
      } else {
        const accessToken = signJWT(
          {
            ...user,
          },
          { expiresIn: "1d" },
        );
        return res.status(200).json({
          success: true,
          statusCode: 200,
          message: "Refresh Session Success",
          data: { accessToken: accessToken },
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      logger.error(`ERR: Auth - Refresh Session failed: ${error.message}`);
      return res.status(422).json({
        success: false,
        statusCode: 422,
        message: `${error.message}`,
      });
    }
  }
};
