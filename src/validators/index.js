import { body } from 'express-validator';

const userRegisterValidator = () => {
  return [
    body('username')
      .trim()
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters long')
      .isLength({ max: 30 })
      .withMessage('Username must be at most 30 characters long'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('fullname')
      .trim()
      .notEmpty()
      .withMessage('Fullname is required')
      .isLength({ min: 3 })
      .withMessage('Fullname must be at least 3 characters long')
      .isLength({ max: 30 })
      .withMessage('Fullname must be at most 30 characters long'),
  ];
};
const userLoginValidator = () => {
  return [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ];
};

export { userRegisterValidator, userLoginValidator };
