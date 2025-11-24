// src/repositories/roomRepo.js
import prisma from "../config/db.js";

export async function createRoom(hotelId, data) {
  return prisma.room.create({
    data: {
      hotelId,
      roomNumber: data.roomNumber,
      capacity: data.capacity,
      pricePerNight: data.pricePerNight,
      isPublished: data.isPublished ?? false,
    },
  });
}

export async function getRoomById(id) {
  return prisma.room.findUnique({
    where: { id },
    include: {
      hotel: {
        select: { id: true, name: true, city: true, address: true },
      },
    },
  });
}

export async function getPublishedRooms(filters = {}) {
  const { city, minCapacity, maxPrice } = filters;

  return prisma.room.findMany({
    where: {
      isPublished: true,
      ...(minCapacity && { capacity: { gte: minCapacity } }),
      ...(maxPrice && { pricePerNight: { lte: maxPrice } }),
      ...(city && {
        hotel: {
          city: {
            equals: city,
            mode: "insensitive",
          },
        },
      }),
    },
    include: {
      hotel: {
        select: { id: true, name: true, city: true },
      },
    },
    orderBy: { pricePerNight: "asc" },
  });
}

export async function updateRoom(id, data) {
  return prisma.room.update({
    where: { id },
    data,
  });
}

export async function deleteRoom(id) {
  return prisma.room.delete({
    where: { id },
  });
}

export async function findFutureBookingForRoom(roomId) {
  return prisma.booking.findFirst({
    where: {
      roomId,
      status: { not: "CANCELLED" },
      startDate: {
        gt: new Date(),
      },
    },
  });
}
