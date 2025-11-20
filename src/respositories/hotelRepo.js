import prisma from "../config/db.js";

const hotelSelect = {
  id: true,
  ownerId: true,
  name: true,
  city: true,
  address: true,
  rating: true,
  isPublished: true,
  createdAt: true,
  updatedAt: true,
};

export async function create(data) {
  return await prisma.hotel.create({
    data,
    select: hotelSelect,
  });
}

export async function findAll() {
  return await prisma.hotel.findMany({
    select: hotelSelect,
    orderBy: { createdAt: "desc" },
  });
}

export async function findByOwner(ownerId) {
  return await prisma.hotel.findMany({
    where: { ownerId },
    select: hotelSelect,
    orderBy: { createdAt: "desc" },
  });
}

export async function update(id, data) {
  return await prisma.hotel.update({
    where: { id },
    data,
    select: hotelSelect,
  });
}

export async function remove(id) {
  return await prisma.hotel.delete({
    where: { id },
    select: hotelSelect,
  });
}
