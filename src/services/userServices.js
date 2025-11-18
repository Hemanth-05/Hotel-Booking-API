import bcrypt from "bcrypt";
import prisma from "../config/db.js";

export async function updateUserService(userId, name, password) {
  const updateData = {};
  if (name) updateData.name = name;
  if (password) updateData.password = await bcrypt.hash(password, 12);

  return prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: { id: true, name: true, email: true, role: true }
  });
}
