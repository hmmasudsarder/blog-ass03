import { Document } from "mongoose";

export interface TBlog extends Document  {
  title: string;
  content: string;
  author: string;
  // isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}