import { Router } from "express";
import { createProduct, getProduct } from "../controllers/product.controller";

export const productsRouter: Router = Router();

productsRouter.get("/", getProduct);
productsRouter.get("/:id", getProduct);
productsRouter.post("/", createProduct);
