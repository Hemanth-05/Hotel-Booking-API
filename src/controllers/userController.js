import bcrypt from 'bcrypt';
import prisma from '../config/db.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getMe = catchAsync(async (req, res) => {
  res.status(200).json({
    user: req.user
  });
});

export const updateMe = catchAsync(async (req, res) => {
  const { name, password } = req.body;

  const updateData = {};
  if (name) updateData.name = name;
  if (password) updateData.password = await bcrypt.hash(password, 12);

  const updatedUser = await prisma.user.update({
    where: { id: req.user.id },
    data: updateData,
    select: { id: true, name: true, email: true, role: true }
  });

  res.status(200).json({
    message: 'Profile updated successfully',
    user: updatedUser
  });
});

export const deleteMe = catchAsync(async (req, res) => {
  await prisma.user.update({
    where: { id: req.user.id },
    data: {
      email: `deleted_${Date.now()}@deleted.com`,
      name: 'Deleted User'
    }
  });

  res.status(204).json({});
});

export const getAllUsers = catchAsync(async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  });

  res.status(200).json({
    users
  });
});

export const getHotelGuests = catchAsync(async (req, res) => {
  const hotelId = parseInt(req.params.hotelId);

  const hotel = await prisma.hotel.findUnique({
    where: { id: hotelId, ownerId: req.user.id }
  });

  if (!hotel) {
    return res.status(403).json({
      error: 'You do not own this hotel'
    });
  }

  const guests = await prisma.booking.findMany({
    where: { room: { hotelId } },
    distinct: ['guestId'],
    select: {
      guest: {
        select: { id: true, name: true, email: true }
      }
    }
  });

  res.status(200).json({
    guests: guests.map(g => g.guest)
  });
});