import bcrypt from 'bcrypt';
import prisma from '../src/config/db.js'; // adjust path if needed

try {
  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.room.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.user.deleteMany();

  // Create users 
  const usersData = [
    {
      name: 'Admin User',
      email: 'admin@hotelapi.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'ADMIN',
    },
    {
      name: 'Hotel Owner',
      email: 'owner@hotelapi.com',
      password: await bcrypt.hash('owner123', 10),
      role: 'OWNER',
    },
    {
      name: 'Guest User',
      email: 'guest@hotelapi.com',
      password: await bcrypt.hash('guest123', 10),
      role: 'GUEST',
    },
  ];

  const users = await Promise.all(
    usersData.map((user) => prisma.user.create({ data: user }))
  );

  const owner = users.find((u) => u.role === 'OWNER');
  const guest = users.find((u) => u.role === 'GUEST');

  // Create a hotel owned by the owner
  const hotel = await prisma.hotel.create({
    data: {
      name: 'Sunset Paradise',
      city: 'Charlotte',
      address: '123 Lakeview Avenue',
      rating: 4.5,
      isPublished: true,
      ownerId: owner.id,
    },
  });

  // Create two rooms for the hotel
  const rooms = await prisma.room.createMany({
    data: [
      {
        hotelId: hotel.id,
        roomNumber: 101,
        capacity: 2,
        pricePerNight: 120.0,
        isPublished: true,
      },
      {
        hotelId: hotel.id,
        roomNumber: 102,
        capacity: 4,
        pricePerNight: 180.0,
        isPublished: true,
      },
    ],
  });

  // Create one test booking for the guest
  await prisma.booking.create({
    data: {
      roomId: 1, // assuming first room created (autoincrement ID)
      guestId: guest.id,
      startDate: new Date('2025-11-15'),
      endDate: new Date('2025-11-17'),
      guests: 2,
      total: 240.0,
      status: 'CONFIRMED',
    },
  });

  console.log('✅ Seed completed successfully!');
} catch (error) {
  console.error('❌ Seed failed:', error);
} finally {
  await prisma.$disconnect();
}
