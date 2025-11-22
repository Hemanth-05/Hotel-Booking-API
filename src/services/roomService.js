// src/services/roomService.js
import prisma from "../config/prismaClient.js";
import {
  createRoom,
  getRoomById,
  getPublishedRooms,
  updateRoom,
  deleteRoom,
  findFutureBookingForRoom,
} from "../repositories/roomRepo.js";

function forbid(message = "Forbidden") {
  const err = new Error(message);
  err.status = 403;
  return err;
}

function notFound(message = "Room not found") {
  const err = new Error(message);
  err.status = 404;
  return err;
}

export async function createRoomForHotel(hotelId, roomData, currentUser) {
  const hotel = await prisma.hotel.findUnique({ where: { id: hotelId } });
  if (!hotel) throw notFound("Hotel not found");

  // Only ADMIN or OWNER of this hotel
  if (
    currentUser.role !== "ADMIN" &&
    !(currentUser.role === "OWNER" && hotel.ownerId === currentUser.id)
  ) {
    throw forbid("Only admin or the hotel owner can add rooms");
  }

  // Simple validation here (you might already do this via express-validator)
  if (!roomData.roomNumber || !roomData.capacity || !roomData.pricePerNight) {
    const err = new Error("roomNumber, capacity and pricePerNight are required");
    err.status = 400;
    throw err;
  }

  // Prisma will enforce @@unique([hotelId, roomNumber]) – you just catch the error in controller
  return createRoom(hotelId, roomData);
}

export async function listRooms(query) {
  const filters = {
    city: query.city,
    capacity: query.capacity ? parseInt(query.capacity) : undefined,
    maxPrice: query.maxPrice ? query.maxPrice : undefined,
  };

  return getPublishedRooms(filters);
}

export async function getPublicRoomById(id) {
  const room = await getRoomById(id);
  if (!room || !room.isPublished) {
    throw notFound();
  }
  return room;
}

// optionally: admins/owners can see unpublished via another service if you ever need it

export async function updateRoomById(id, updates, currentUser) {
  const room = await prisma.room.findUnique({
    where: { id },
    include: { hotel: true },
  });

  if (!room) throw notFound();

  if (
    currentUser.role !== "ADMIN" &&
    !(currentUser.role === "OWNER" && room.hotel.ownerId === currentUser.id)
  ) {
    throw forbid("Only admin or the hotel owner can update this room");
  }

  // Restrict fields that can be updated via this endpoint
  const allowed = {};
  if (updates.capacity !== undefined) allowed.capacity = updates.capacity;
  if (updates.pricePerNight !== undefined)
    allowed.pricePerNight = updates.pricePerNight;
  if (updates.isPublished !== undefined)
    allowed.isPublished = updates.isPublished;

  if (Object.keys(allowed).length === 0) return room; // nothing to update

  return updateRoom(id, allowed);
}

export async function deleteRoomById(id, currentUser) {
  const room = await prisma.room.findUnique({
    where: { id },
    include: { hotel: true },
  });
  if (!room) throw notFound();

  if (
    currentUser.role !== "ADMIN" &&
    !(currentUser.role === "OWNER" && room.hotel.ownerId === currentUser.id)
  ) {
    throw forbid("Only admin or the hotel owner can delete this room");
  }

  const futureBooking = await findFutureBookingForRoom(id);
  if (futureBooking) {
    const err = new Error(
      "Cannot delete room: future bookings exist for this room"
    );
    err.status = 400;
    throw err;
  }

  return deleteRoom(id);
}
