import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';
import { StatusCodes } from 'http-status-codes';


const createBlog = catchAsync(async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user?.userId; // get user id from token
  const result = await BlogServices.createBlogIntoDb({
    title,
    content,
    author: userId,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog post successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogs(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog are retrieved successfully',
    data: result,
  });
});

const updateBlogController = catchAsync(async (req, res) => {
  const blogId = req.params.id;
  const { title, content } = req.body;
  const userId = req.user?.userId;
  const updatedBlog= await BlogServices.updateBlogById(
    blogId,
    { title, content },
    userId,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog updated successfully!',
    data: updatedBlog,
  });
});

const deleteBlogById = catchAsync(async (req, res) => {
  const blogId = req.params.id;
  const userId = req.user?.userId;
  const result = await BlogServices.deleteBlogById(blogId, userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog deleted  successfully!',
    data: result,
  });
});

// delete blog by admin user route use it
const deleteBlogByAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.deleteBlogByAdmin(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog deleted successfully!',
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  updateBlogController,
  deleteBlogById,
  deleteBlogByAdmin,
};