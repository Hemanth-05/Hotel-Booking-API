import * as hotelRepo from "../repositories/hotelRepo.js";

export function createHotel(data) {
  return hotelRepo.create(data);
}

export function getAdminHotels() {
  return hotelRepo.findAll();
}

export function getOwnerHotels(ownerId) {
  return hotelRepo.findByOwner(ownerId);
}

export function updateHotel(id, data) {
  return hotelRepo.update(id, data);
}

export function deleteHotel(id) {
  return hotelRepo.remove(id);
}
