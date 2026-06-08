import { Router } from "express";
import { registeUser } from "../controllers/auth.controller";

export const authRouter: Router = Router();

authRouter.post("/register", registeUser);
