import { Router } from 'express';
import glob from 'glob';

import { Route } from '../../modules/shared/interfaces/Route';

export const registerRoutes = (router: Router) => {
  const routes = glob.sync('./src/modules/**/*.route.ts', { absolute: true });
  routes.map(async(route) => await register(route, router));

  return router;
};

const register = async(routePath: string, router: Router) => {
  const route = await import(routePath) as Route;
  route.register(router);
};
