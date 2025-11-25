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
  if (!room) {
    const err = new Error("Room not found");
    err.status = 404;
    throw err;
  }

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
  return getUserBookingsFromDB(userId).then((bookings) =>
    bookings.map((b) => ({
      id: b.id,
      hotelName: b.room?.hotel?.name,
      roomNumber: b.room?.roomNumber,
      guests: b.guests,
      cost: b.total,
      username: b.guest?.name,
      status: b.status,
    }))
  );
}

export function getOwnerBookingsService(ownerId, hotelId) {
  return getOwnerBookingsFromDB(ownerId, hotelId).then((bookings) =>
    bookings.map((b) => ({
      id: b.id,
      hotelName: b.room?.hotel?.name,
      roomNumber: b.room?.roomNumber,
      guests: b.guests,
      cost: b.total,
      username: b.guest?.name,
      status: b.status,
    }))
  );
}

export function getAdminBookingsService() {
  return getAdminBookingsFromDB().then((bookings) =>
    bookings.map((b) => ({
      id: b.id,
      hotelName: b.room?.hotel?.name,
      roomNumber: b.room?.roomNumber,
      guests: b.guests,
      cost: b.total,
      username: b.guest?.name,
      status: b.status,
    }))
  );
}

export function updateBookingService(id, data) {
  return prisma.booking
    .findUnique({
      where: { id },
      include: { room: true },
    })
    .then(async (existing) => {
      if (!existing) {
        const err = new Error("Booking not found");
        err.status = 404;
        throw err;
      }

      const updates = {};

      // Handle room change
      let targetRoom = existing.room;
      if (data.roomId && data.roomId !== existing.roomId) {
        const newRoom = await prisma.room.findUnique({
          where: { id: data.roomId },
        });
        if (!newRoom) {
          const err = new Error("Room not found");
          err.status = 404;
          throw err;
        }
        targetRoom = newRoom;
        updates.roomId = data.roomId;
      }

      // Handle dates
      const start = data.startDate
        ? new Date(data.startDate)
        : existing.startDate;
      const end = data.endDate ? new Date(data.endDate) : existing.endDate;

      if (data.startDate || data.endDate) {
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          const err = new Error("Invalid booking dates");
          err.status = 400;
          throw err;
        }
        if (end <= start) {
          const err = new Error("endDate must be after startDate");
          err.status = 400;
          throw err;
        }
        updates.startDate = start;
        updates.endDate = end;
      }

      // Handle guests
      const guests = data.guests ?? existing.guests;
      if (data.guests !== undefined) {
        updates.guests = data.guests;
      }

      // Capacity check
      if (guests > targetRoom.capacity) {
        const err = new Error(`Room capacity is ${targetRoom.capacity}`);
        err.status = 400;
        throw err;
      }

      // Overlap check (only if dates or room changed)
      if (updates.startDate || updates.endDate || updates.roomId) {
        const overlapping = await prisma.booking.findFirst({
          where: {
            roomId: updates.roomId ?? existing.roomId,
            status: "CONFIRMED",
            id: { not: id },
            startDate: { lt: end },
            endDate: { gt: start },
          },
        });
        if (overlapping) {
          const err = new Error("Room is already booked for these dates");
          err.status = 400;
          throw err;
        }
      }

      // Status (already validated upstream)
      if (data.status) {
        updates.status = data.status;
      }

      // Recalculate total if dates or room changed
      if (updates.startDate || updates.endDate || updates.roomId) {
        const nights =
          (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
        updates.total = nights * Number(targetRoom.pricePerNight);
      }

      if (Object.keys(updates).length === 0) {
        const err = new Error("No data provided to update");
        err.status = 400;
        throw err;
      }

      return updateBookingInDB(id, updates);
    });
}

export function cancelBookingService(id) {
  return prisma.booking
    .findUnique({ where: { id } })
    .then((existing) => {
      if (!existing) {
        const err = new Error("Booking not found");
        err.status = 404;
        throw err;
      }
      return cancelBookingInDB(id);
    });
}

export function deleteBookingService(id) {
  return prisma.booking
    .findUnique({ where: { id } })
    .then((existing) => {
      if (!existing) {
        const err = new Error("Booking not found");
        err.status = 404;
        throw err;
      }
      return deleteBookingFromDB(id);
    });
}

export function getBookingByIdService(id) {
  return getBookingByIdFromDB(id);
}
