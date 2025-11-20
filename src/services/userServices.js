import bcrypt from "bcrypt";
import {
    createUser,
    findUserByEmail,
    updateUser as repoUpdateUser,        
    deleteUser as repoDeleteUser,       
    getUserById as repoGetUserById,      
    getAllUsers as repoGetAllUsers,      
    getHotelGuests as repoGetHotelGuests 
} from "../respositories/userRepo.js";

export async function updateUser(userId, name, password) {
    const updateData = {};

    if (name) updateData.name = name;
    if (password) {
        updateData.password = await bcrypt.hash(password, 12);
    }

    
    if (Object.keys(updateData).length === 0) {
        throw new Error("No data provided to update");
    }

    return await repoUpdateUser(userId, updateData); 
}


export async function deleteUser(userId) {
    return await repoDeleteUser(userId);
}


export async function getUserById(userId) {
    return await repoGetUserById(userId);
}


export async function getAllUsers() {
    return await repoGetAllUsers();
}


export async function getHotelGuests(hotelId, ownerId) {
    return await repoGetHotelGuests(hotelId, ownerId);
}

export { createUser, findUserByEmail };