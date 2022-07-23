import { Router } from 'express';

export interface Route {
  registerRoutes: (route: Router) => void
}
