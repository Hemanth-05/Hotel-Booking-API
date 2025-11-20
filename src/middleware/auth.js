import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';
const JWT_SECRET = process.env.JWT_SECRET

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      error: 'You are not logged in! Please log in to get access.'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true, name: true }
    });

    if (!currentUser) {
      return res.status(401).json({
        error: 'The user belonging to this token no longer exists.'
      });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    return res.status(401).json({
      error: 'Invalid token. Please log in again.'
    });
  }
};