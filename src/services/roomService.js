// src/services/roomService.js
import prisma from "../config/db.js";
import { Prisma } from "../generated/prisma/index.js";
import {
  createRoom,
  getRoomById,
  getPublishedRooms,
  updateRoom,
  deleteRoom,
  findFutureBookingForRoom,
} from "../respositories/roomRepo.js";

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
  if (!roomData.roomNumber || !roomData.capacity || roomData.pricePerNight === undefined) {
    const err = new Error("roomNumber, capacity and pricePerNight are required");
    err.status = 400;
    throw err;
  }

  try {
    // Prisma enforces @@unique([hotelId, roomNumber]); surface a 409 instead of 500
    return await createRoom(hotelId, roomData);
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      const error = new Error("Room number already exists for this hotel");
      error.status = 409;
      throw error;
    }
    throw err;
  }
}

export async function listRooms(query) {
  const filters = {
    city: query.city,
    minCapacity: query.minCapacity ? parseInt(query.minCapacity) : undefined,
    maxPrice: query.maxPrice ? parseFloat(query.maxPrice) : undefined,
  };

  const rooms = await getPublishedRooms(filters);
  return rooms.map((room) => ({
    id: room.id,
    hotelName: room.hotel.name,
    roomNumber: room.roomNumber,
    capacity: room.capacity,
    pricePerNight: room.pricePerNight,
  }));
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

  // Block delete if any non-cancelled bookings exist (past or future)
  const activeBooking = await prisma.booking.findFirst({
    where: { roomId: id, status: { not: "CANCELLED" } },
  });
  if (activeBooking) {
    const err = new Error("Cannot delete room: bookings exist for this room");
    err.status = 400;
    throw err;
  }

  // Clean up cancelled bookings to allow FK-safe delete
  await prisma.booking.deleteMany({
    where: { roomId: id, status: "CANCELLED" },
  });

  try {
    return await deleteRoom(id);
  } catch (err) {
    // Handle FK constraint when bookings (past or future) still exist
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2003"
    ) {
      const error = new Error("Cannot delete room: bookings exist for this room");
      error.status = 400;
      throw error;
    }
    throw err;
  }
}
