import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../User/user.validation';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';



const router = express.Router();

router.post('/register', validateRequest(UserValidation.userValidationSchema), AuthControllers.userRegistration)

router.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser)

export const AuthRoutes = router;