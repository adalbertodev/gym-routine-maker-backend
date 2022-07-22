import { Router } from 'express';

export interface Route {
  register: (route: Router) => void
}
