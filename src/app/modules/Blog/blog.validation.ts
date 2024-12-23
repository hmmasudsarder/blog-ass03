import { z } from 'zod';

export const blogValidationSchema = z.object({
    body: z.object({
        title: z
            .string({
                invalid_type_error: 'Title be a string',
            })
            .min(1, 'Title is required'),
        content: z.string({
            invalid_type_error: 'content be a string',
        }).min(1, 'Content is required'),
    })
});

export const BlogValidation = {
    blogValidationSchema,
};