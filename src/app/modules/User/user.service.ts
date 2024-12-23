import { StatusCodes } from "http-status-codes";
import AppError from "../../Error/AppError";
import { User } from "./user.model";


const blockUserByAdmin = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user not found !');
  }

  if (user.role === 'admin') {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'you can not block admin ');
  }

  if (user.isBlocked) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user al ready block ');
  }

  user.isBlocked = true;
  const result = await user.save();

  return result;
};

export const userServices = {
    blockUserByAdmin
};