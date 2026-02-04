import User from '../models/user.models.js';
import { ApiError } from '../utils/api-error.js';
import { ApiResponse } from '../utils/api-response.js';
import { asyncHandler } from '../utils/async-handler.js';
import { emailVerificationMailContent, sendMail } from '../utils/mail.js';
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, 'Failed to generate access and refresh token');
  }
};
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, fullname } = req.body;
  if (!username || !email || !password || !fullname) {
    throw new ApiError(400, 'All fields are required');
  }

  const user = await User.findOne({ $or: [{ email }, { username }] });
  if (user) {
    throw new ApiError(400, 'User already exists');
  }

  console.log('Creating user...');
  const newUser = await User.create({
    username,
    email,
    password,
    fullname,
    isEmailVerified: false,
  });
  console.log('User created');

  const { unhashToken, hashedToken, tokenExpiry } =
    newUser.generateVerificationToken();

  newUser.emailVerificationToken = hashedToken;
  newUser.emailVerificationExpiry = tokenExpiry;
  await newUser.save({ validateBeforeSave: false });
  console.log('Verification token saved');

  console.log('Sending email...');
  await sendMail({
    to: newUser?.email,
    subject: 'Email Verification',
    content: await emailVerificationMailContent(
      newUser?.username,
      `${req.protocol}://${req.get('host')}/api/v1/auth/verify-email/${unhashToken}`,
    ),
  });
  console.log('Email sent');

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    newUser?._id,
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        accessToken,
        refreshToken,
        user: await User.findById(newUser?._id).select(
          '-password -refreshToken -emailVerificationToken -emailVerificationExpiry -forgotPasswordToken -forgotPasswordExpiry',
        ),
      },
      'User registered successfully',
    ),
  );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, 'All fields are required');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, 'User not found');
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, 'Invalid password');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user?._id,
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken,
          user: await User.findById(user?._id).select(
            '-password -refreshToken -emailVerificationToken -emailVerificationExpiry -forgotPasswordToken -forgotPasswordExpiry',
          ),
        },
        'User logged in successfully',
      ),
    );
});
