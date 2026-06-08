import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../controllers/product.controller";

export const productsRouter: Router = Router();

productsRouter.get("/", getProduct);
productsRouter.get("/:id", getProduct);
productsRouter.post("/", createProduct);
productsRouter.put("/:id", updateProduct);
productsRouter.delete("/:id", deleteProduct);
