/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Request, type Response, type NextFunction } from "express";
import { verifyJWT } from "../utils/jwt";

const deserializeToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.headers.authorization?.replace(/^Bearer\s/, "");
  if (!accessToken) {
    return next();
  } else {
    const token: any = verifyJWT(accessToken);
    if (token.decoded) {
      res.locals.user = token.decoded;
      return next();
    }
    if (token.expired) {
      return next();
    }
    return next();
  }
};

export default deserializeToken;
