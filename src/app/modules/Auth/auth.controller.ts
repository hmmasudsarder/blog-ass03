import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import { Request, Response } from 'express';

const userRegistration = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.registerUser(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Create User successfully!',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, role } = result;

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `${role} is login successfully!`,
    data: {
      accessToken,
    },
  });
});

export const AuthControllers = {
  loginUser,
  userRegistration,
};