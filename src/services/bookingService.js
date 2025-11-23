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

  const nights =
    (new Date(endDate).getTime() - new Date(startDate).getTime()) /
    (1000 * 60 * 60 * 24);

  if (nights < 1) throw new Error("Invalid booking dates");

  const total = nights * Number(room.pricePerNight);

  return createBookingInDB({
    roomId,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    guests,
    guestId: userId,
    total,
    status: "BOOKED"
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
