import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import catchAsync from '../utils/catchAsync';
import AppError from '../Error/AppError';
import { TUserRole } from '../modules/User/user.interface';
import { StatusCodes } from 'http-status-codes';
import { User } from '../modules/User/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.split(' ')[1]
      : req.headers.authorization;

    // console.log('token', token);

    // checking if the token is missing
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'you are not authorized!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    // console.log('decoded result', decoded);
    const { role, userId, iat } = decoded;

    // checking if the user is exist
    const user = await User.isUserExistsById(userId);

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

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'You are not authorized  hoi hoi!',
      );
    }

    // req.user = decoded as JwtPayload;
    req.user = {
      userId,
      role,
      iat,
    };
    // console.log('req.user: from auth mid', req.user)
    next();
  });
};

export default auth;