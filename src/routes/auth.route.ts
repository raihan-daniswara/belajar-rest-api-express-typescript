import { Router } from "express";
import {
  registeUser,
  createSession,
  refreshSession,
} from "../controllers/auth.controller";

export const authRouter: Router = Router();

authRouter.post("/register", registeUser);
authRouter.post("/login", createSession);
authRouter.post("/refresh", refreshSession);
