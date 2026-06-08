import type { Application, Router } from "express";
import { healthRouter } from "./routes/health.route";
import { productsRouter } from "./routes/product.route";
import "./utils/connectDB";
import { authRouter } from "./routes/auth.route";

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
