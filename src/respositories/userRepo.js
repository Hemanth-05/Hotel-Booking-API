import prisma from '../config/db.js';

export async function createUser(data) {
    return await prisma.user.create({
        data,
        select: { id: true, name: true, email: true, role: true }
    });
}

export async function findUserByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
}

export async function updateUser(userId, data) {
    return prisma.user.update({
        where: { id: userId },
        data,
        select: { id: true, name: true, email: true, role: true }
    });
}

export async function deleteUser(userId) {
    return prisma.user.update({
        where: { id: userId },
        data: {
            email: `deleted_${Date.now()}@deleted.com`,
            name: 'Deleted User',
        }
    });
}

export async function getUserById(userId) {
    return prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, role: true }
    });
}

export async function getAllUsers() {
    return prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true, createdAt: true }
    });
}

export async function getHotelGuests(hotelId, ownerId) {
    const hotel = await prisma.hotel.findUnique({
        where: { id: hotelId, ownerId }
    });

    if (!hotel) {
        const error = new Error("You do not own this hotel");
        error.status = 403;
        throw error;
    }

    const guests = await prisma.booking.findMany({
        where: { room: { hotelId } },
        distinct: ['guestId'],
        select: { guest: { select: { id: true, name: true, email: true } } }
    });

    return guests.map(g => g.guest);
}