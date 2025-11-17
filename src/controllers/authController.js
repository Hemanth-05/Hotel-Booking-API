import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';
import { catchAsync } from '../utils/catchAsync.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

export const signup = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Please provide email and password'
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'GUEST'
    },
    select: { id: true, name: true, email: true, role: true }
  });

  const token = generateToken(newUser.id);

  res.status(201).json({
    message: 'User registered successfully',
    token,
    user: newUser
  });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Please provide email and password'
    });
  }

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      error: 'Incorrect email or password'
    });
  }

  const token = generateToken(user.id);

  const { password: _, ...userWithoutPassword } = user;

  res.status(200).json({
    message: 'Login successful',
    token,
    user: userWithoutPassword
  });
});