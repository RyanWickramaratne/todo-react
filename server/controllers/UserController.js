import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ApiError from '../helpers/ApiError.js';

export const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ApiError('Email and password are required', 400));
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.createUser(email, hashedPassword);
    res.status(201).json({ id: newUser.id });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ApiError('Email and password are required', 400));
  }

  try {
    const user = await User.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new ApiError('Invalid credentials', 400));
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
