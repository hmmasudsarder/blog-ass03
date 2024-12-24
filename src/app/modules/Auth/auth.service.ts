import config from '../../config';
import { TLoginUser } from './auth.interface';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import AppError from '../../Error/AppError';
import { StatusCodes } from 'http-status-codes';
import { createToken } from './auth.constant';

const registerUser = async (payload: TUser) => {
  const useresist = await User.findOne({ email: payload.email });
  if (useresist) {
    throw new AppError(
      StatusCodes.CONFLICT,
      `${useresist.email} Already Exists`,
    );
  }

  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
  }

  // Check if the user is blocked
  if (user.isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked!');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    userId: user._id.toString(),
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_access_expire_time as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
};