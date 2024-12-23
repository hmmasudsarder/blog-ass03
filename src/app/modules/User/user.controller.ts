import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  await userServices.blockUserByAdmin(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'user blocked successfully!',
    data: '',
  });
});

export const userController = {
  blockUser,
};