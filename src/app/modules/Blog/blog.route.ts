import express from 'express';
import { BlogController } from './blog.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';

const router = express.Router();

router.post('/', auth('user'), validateRequest(BlogValidation.blogValidationSchema), BlogController.createBlog)
router.patch('/:id', auth('user'), validateRequest(BlogValidation.blogValidationSchema), BlogController.updateBlogController)
router.delete('/:id', auth('user'), BlogController.deleteBlogById)
router.get('/', BlogController.getAllBlogs)





export const BlogRoutes = router;