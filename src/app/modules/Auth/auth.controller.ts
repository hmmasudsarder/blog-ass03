import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const userRegistration = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUser(req.body);
  const { _id: id, name,
    email } = result;

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User registered successfully',
    data: {
      id, name, email
    },
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { token } = result;

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `Login successful`,
    data: {
      token,
    },
  });
});

export const AuthControllers = {
  loginUser,
  userRegistration,
};