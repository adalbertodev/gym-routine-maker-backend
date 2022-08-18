import { Router } from 'express';

import { getUsersController } from '../controllers';
import { deleteUserController } from '../controllers/deleteUserController';
import { updateUserController } from '../controllers/updateUserController';
import { deleteUserMiddlewares, getUsersMiddlewares, updateUserMiddlewares } from '../middlewares';

export const registerRoutes = (router: Router) => {
  router.get('/auth/users', getUsersMiddlewares, getUsersController);
  router.put('/auth/users/:userId', updateUserMiddlewares, updateUserController);
  router.delete('/auth/users/:userId', deleteUserMiddlewares, deleteUserController);
};
