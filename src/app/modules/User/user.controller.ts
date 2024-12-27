import { StatusCodes } from 'http-status-codes';
import { userServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await userServices.blockUserAdmin(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User blocked successfully!',
    data: null,
  });
});

export const userController = {
  blockUser,
};