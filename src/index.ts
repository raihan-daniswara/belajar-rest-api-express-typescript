import type { Application, Router } from "express";
import { healthRouter } from "./routes/health";
import { productsRouter } from "./routes/product";

type AppRoute = [string, Router];

const _routes: AppRoute[] = [
  ["/health", healthRouter],
  ["/products", productsRouter],
];

export const routes = (app: Application): void => {
  _routes.forEach((route) => {
    console.log(route);
    const [url, router]: AppRoute = route;
    app.use(url, router);
  });
};
