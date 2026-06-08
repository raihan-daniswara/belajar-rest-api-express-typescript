import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../controllers/product.controller";
import { requireAdmin, requireUser } from "../middleware/auth";

export const productsRouter: Router = Router();

productsRouter.get("/", getProduct);
productsRouter.get("/:id", getProduct);
productsRouter.post("/", requireUser, createProduct);
productsRouter.put("/:id", requireUser, updateProduct);
productsRouter.delete("/:id", requireAdmin, deleteProduct);
