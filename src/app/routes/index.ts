import { Router } from 'express';
import glob from 'glob';

import { Route } from '../../context/shared/interfaces/Route';

export const registerRoutes = (router: Router) => {
  const routes = glob.sync('./src/context/**/*.route.ts', { absolute: true });
  routes.map(async(route) => await register(route, router));

  return router;
};

const register = async(routePath: string, router: Router) => {
  const route = await import(routePath) as Route;
  route.register(router);
};
