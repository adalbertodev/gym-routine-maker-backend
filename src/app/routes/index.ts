import { Router } from 'express';
import glob from 'glob';

import { Route } from '../../modules/Shared/application/interfaces/Route';

export const registerRoutes = (router: Router) => {
  const directory = process.env.NODE_ENV === 'production' ? 'dist' : 'src';
  const routes = glob.sync(`./${directory}/modules/**/*.route.?(js|ts)`, { absolute: true });
  routes.map(async(route) => await register(route, router));

  return router;
};

const register = async(routePath: string, router: Router) => {
  const route = await import(routePath) as Route;
  route.registerRoutes(router);
};
