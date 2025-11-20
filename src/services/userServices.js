import bcrypt from "bcrypt";
import {
    updateUser,
    deleteUser,
    getUserById,
    getAllUsers,
    getHotelGuests,
    createUser,
    findUserByEmail
} from "../repositories/userRepo.js";

export async function updateUser(userId, name, password) {
    const updateData = {};
    if (name) updateData.name = name;
    if (password) updateData.password = await bcrypt.hash(password, 12);

    return await updateUser(userId, updateData);
}

export async function deleteUser(userId) {
    return await deleteUser(userId);
}

export async function getUserById(userId) {
    return await getUserById(userId);
}

export async function getAllUsers() {
    return await getAllUsers();
}

export async function getHotelGuests(hotelId, ownerId) {
    return await getHotelGuests(hotelId, ownerId);
}

export { createUser, findUserByEmail };