import bcrypt from "bcrypt";
import { Prisma } from "../generated/prisma/index.js";
import {
    createUser,
    findUserByEmail,
    updateUser as repoUpdateUser,        
    deleteUser as repoDeleteUser,       
    getUserById as repoGetUserById,      
    getAllUsers as repoGetAllUsers,      
    getHotelGuests as repoGetHotelGuests 
} from "../respositories/userRepo.js";
import prisma from "../config/db.js";

export async function updateUser(userId, name, password, email) {
    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) {
        updateData.password = await bcrypt.hash(password, 12);
    }

    
    if (Object.keys(updateData).length === 0) {
        const error = new Error("No data provided to update");
        error.status = 400;
        throw error;
    }

    try {
        return await repoUpdateUser(userId, updateData); 
    } catch (err) {
        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2002"
        ) {
            const error = new Error("Email has already been used");
            error.status = 409;
            throw error;
        }
        throw err;
    }
}


export async function deleteUser(userId) {
    // Cancel this user's bookings, then mask user data
    await prisma.booking.updateMany({
        where: { guestId: userId },
        data: { status: "CANCELLED" },
    });

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
