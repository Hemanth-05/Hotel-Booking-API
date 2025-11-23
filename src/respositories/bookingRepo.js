import prisma from "../config/db.js";

export function createBookingInDB(data) {
  return prisma.booking.create({ data });
}

export function getUserBookingsFromDB(userId) {
  return prisma.booking.findMany({
    where: { guestId: userId },
    include: { room: true }
  });
}

export function getOwnerBookingsFromDB(ownerId, hotelId) {
  return prisma.booking.findMany({
    where: {
      room: {
        hotel: {
          ownerId,
          id: hotelId ? Number(hotelId) : undefined
        }
      }
    },
    include: {
      guest: { select: { id: true, name: true, email: true } },
      room: true
    }
  });
}

export function getAdminBookingsFromDB() {
  return prisma.booking.findMany({
    include: {
      guest: true,
      room: true
    }
  });
}

export function getBookingByIdFromDB(id) {
  return prisma.booking.findUnique({ where: { id } });
}

export function updateBookingInDB(id, data) {
  return prisma.booking.update({
    where: { id },
    data
  });
}

export function cancelBookingInDB(id) {
  return prisma.booking.update({
    where: { id },
    data: { status: "CANCELED" }
  });
}

export function deleteBookingFromDB(id) {
  return prisma.booking.delete({ where: { id } });
}
