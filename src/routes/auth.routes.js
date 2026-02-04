import express from 'express';
import { loginUser, registerUser } from '../controllers/auth.controllers.js';
import { validate } from '../middlewares/validator.middleware.js';
import {
  userLoginValidator,
  userRegisterValidator,
} from '../validators/index.js';
const router = express.Router();

router.post('/register', userRegisterValidator(), validate, registerUser);
router.post('/login', userLoginValidator(), validate, loginUser);
// router.post('/logout', verifyJWT, logout);
// router.get('/current-user', verifyJWT, getCurrentUser);
// router.post('/change-password', verifyJWT, changePassword);
// router.post('/refresh-token', refreshAccessToken);
// router.get('/verify-email/:verificationToken', verifyEmail);
// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password/:resetToken', resetPassword);
// router.post('/resend-email-verification', resendEmailVerification);

export default router;
