// userRoutes.ts

import { Router } from 'express';
import * as userController from '../controllers/user.controller';

export const userRouter = Router()


// Route for user signup
userRouter.post('/signup', userController.signup);

// Route for user login
userRouter.post('/login', userController.login);

export default userRouter;
