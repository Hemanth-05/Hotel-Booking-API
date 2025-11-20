import { Prisma } from "../generated/prisma/index.js";
import * as hotelRepo from "../respositories/hotelRepo.js";

function handleNotFound(err) {
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2025"
  ) {
    const error = new Error("Hotel not found");
    error.status = 404;
    throw error;
  }
  throw err;
}

export async function createHotelServices(data) {
  return await hotelRepo.create(data);
}

export async function getAdminHotelsServices() {
  return await hotelRepo.findAll();
}

export async function getOwnerHotelsServices(ownerId) {
  return await hotelRepo.findByOwner(ownerId);
}

export async function updateHotelServices(id, data) {
  return await hotelRepo.update(id, data).catch(handleNotFound);
}

export async function deleteHotelServices(id) {
  return await hotelRepo.remove(id).catch(handleNotFound);
}
