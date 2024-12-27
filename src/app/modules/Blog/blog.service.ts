import { TBlog } from './blog.interface';
import { BlogModel } from './blog.model';
import { BlogSearchFields } from './blog.constant';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../Error/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
// import QueryBuilder from '../../builder/QueryBuilder';

const createBlogIntoDb = async (payload: Partial<TBlog>) => {
    const newBlog = await BlogModel.create(payload);

    // Populate the author field with details from the User model
    const result = await BlogModel.findById(newBlog._id)
        .populate('author', 'name email')
        .exec();

    return result;
};

// get all Blog from db
const getAllBlogs = async (query: Record<string, unknown>) => {
    const blogQuery = new QueryBuilder(
        BlogModel.find().populate('author', "name email"),
        query,
    )
        .search(BlogSearchFields)
        .filter()
        .sort()
        .fields();

    const result = await blogQuery.modelQuery.exec();
    // console.log('Query Result:', result);

    return result;
};

// updated operation
const updateBlogById = async (
    blogId: string,
    updateData: { title: string; content: string },
    userId: string,
) => {
    const blog = await BlogModel.findById(blogId);

    if (!blog) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found!');
    }

    // Check if the user is the author of the blog
    if (blog.author.toString() !== userId) {
        throw new AppError(
            StatusCodes.FORBIDDEN,
            'You can only update your own blog!',
        );
    }

    const result = await BlogModel.findOneAndUpdate(
        { _id: blogId },
        { $set: updateData },
        { new: true },
    )
        .populate('author', 'name email')
        .exec();

    return result;
};

//   deleted operation
const deleteBlogById = async (blogId: string, userId: string) => {
    // Find the blog and delete
    const result = await BlogModel.findOneAndDelete({
        _id: blogId,
        author: userId,
    });

    if (!result) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            'Blog not found or you are not authorized to delete it!',
        );
    }

    // return { message: 'Blog deleted successfully' };
};


const deleteBlogByAdmin = async (id: string) => {
    const result = await BlogModel.findOneAndDelete({ _id: id });

    if (!result) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            'Blog not found or you are not authorized to delete it!',
        );
    }

    // return { message: 'blog deleted successfully' };
};

export const BlogServices = {
    createBlogIntoDb,
    getAllBlogs,
    updateBlogById,
    deleteBlogById,
    deleteBlogByAdmin
};