// src/controllers/roomController.js
import {
  createRoomForHotel,
  listRooms,
  getPublicRoomById,
  updateRoomById,
  deleteRoomById,
} from "../services/roomService.js";

export async function createRoomController(req, res, next) {
  try {
    const hotelId = parseInt(req.params.hotelId, 10);
    const room = await createRoomForHotel(hotelId, req.body, req.user);
    res.status(201).json(room);
  } catch (err) {
    next(err);
  }
}

export async function getRoomsController(req, res, next) {
  try {
    const rooms = await listRooms(req.query);
    // Shape to match your example if you want:
    // [{ id, roomNumber, capacity, pricePerNight, hotel: { name } }]
    res.json(rooms);
  } catch (err) {
    next(err);
  }
}

export async function getRoomByIdController(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const room = await getPublicRoomById(id);
    res.json(room);
  } catch (err) {
    next(err);
  }
}

export async function updateRoomController(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await updateRoomById(id, req.body, req.user);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteRoomController(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    await deleteRoomById(id, req.user);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
