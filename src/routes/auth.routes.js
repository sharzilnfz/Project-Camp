import express from 'express';
const router = express.Router();

router.post('/registrer', register);
router.post('/login', login);
router.post('/logout', verifyJWT, logout);
router.get('/current-user', verifyJWT, getCurrentUser);
router.post('/change-password', verifyJWT, changePassword);
router.post('/refresh-token', refreshAccessToken);
router.get('/verify-email/:verificationToken', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:resetToken', resetPassword);
router.post('/resend-email-verification', resendEmailVerification);

export default router;
