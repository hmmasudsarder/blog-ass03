import { Router } from 'express';
import { BlogRoutes } from '../modules/Blog/blog.route';
import { userRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';




const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/admin',
    route: userRoutes,
  },
 
  
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;