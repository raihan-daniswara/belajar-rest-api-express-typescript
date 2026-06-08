import type { Application, Router } from "express";
import { healthRouter } from "./health.route";
import { productsRouter } from "./product.route";
import { authRouter } from "./auth.route";
import "../utils/connectDB";

type AppRoute = [string, Router];

const _routes: AppRoute[] = [
  ["/health", healthRouter],
  ["/products", productsRouter],
  ["/auth", authRouter],
];

export const routes = (app: Application): void => {
  _routes.forEach((route) => {
    const [url, router]: AppRoute = route;
    app.use(url, router);
  });
};
