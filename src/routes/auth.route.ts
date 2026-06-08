import { Router } from "express";
import { registeUser, createSession } from "../controllers/auth.controller";

export const authRouter: Router = Router();

authRouter.post("/register", registeUser);
authRouter.post("/login", createSession);
