import {
  createBookingInDB,
  getUserBookingsFromDB,
  getOwnerBookingsFromDB,
  getAdminBookingsFromDB,
  getBookingByIdFromDB,
  updateBookingInDB,
  cancelBookingInDB,
  deleteBookingFromDB
} from "../respositories/bookingRepo.js";

import prisma from "../config/db.js";

export async function createBookingService({ roomId, startDate, endDate, guests, userId }) {
  const room = await prisma.room.findUnique({ where: { id: roomId } });
  if (!room) throw new Error("Room not found");

  if (!startDate || !endDate) {
    const err = new Error("startDate and endDate are required");
    err.status = 400;
    throw err;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    const err = new Error("Invalid booking dates");
    err.status = 400;
    throw err;
  }

  const nights = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  if (nights < 1) {
    const err = new Error("Invalid booking dates");
    err.status = 400;
    throw err;
  }

  if (guests > room.capacity) {
    const err = new Error(`Room capacity is ${room.capacity}`);
    err.status = 400;
    throw err;
  }

  const overlapping = await prisma.booking.findFirst({
    where: {
      roomId,
      status: "CONFIRMED",
      startDate: { lt: end },
      endDate: { gt: start },
    },
  });

  if (overlapping) {
    const err = new Error("Room is already booked for these dates");
    err.status = 400;
    throw err;
  }

  const total = nights * Number(room.pricePerNight);

  return createBookingInDB({
    roomId,
    startDate: start,
    endDate: end,
    guests,
    guestId: userId,
    total,
    status: "CONFIRMED"
  });
}

export function getUserBookingsService(userId) {
  return getUserBookingsFromDB(userId);
}

export function getOwnerBookingsService(ownerId, hotelId) {
  return getOwnerBookingsFromDB(ownerId, hotelId);
}

export function getAdminBookingsService() {
  return getAdminBookingsFromDB();
}

export function updateBookingService(id, data) {
  return updateBookingInDB(id, data);
}

export function cancelBookingService(id) {
  return cancelBookingInDB(id);
}

export function deleteBookingService(id) {
  return deleteBookingFromDB(id);
}

export function getBookingByIdService(id) {
  return getBookingByIdFromDB(id);
}
