import bcrypt from 'bcrypt';
import prisma from '../src/config/db.js';

async function main() {
  // Clear existing data (order matters because of FKs)
  await prisma.booking.deleteMany();
  await prisma.room.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.user.deleteMany();

  // Users
  const [admin, owner, owner2, guest1, guest2] = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@hotelapi.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'ADMIN',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Owner One',
        email: 'owner1@hotelapi.com',
        password: await bcrypt.hash('owner123', 10),
        role: 'OWNER',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Owner Two',
        email: 'owner2@hotelapi.com',
        password: await bcrypt.hash('owner223', 10),
        role: 'OWNER',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Guest One',
        email: 'guest1@hotelapi.com',
        password: await bcrypt.hash('guest123', 10),
        role: 'GUEST',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Guest Two',
        email: 'guest2@hotelapi.com',
        password: await bcrypt.hash('guest223', 10),
        role: 'GUEST',
      },
    }),
  ]);

  // Hotels (one without owner)
  const [hotelA, hotelB, hotelNoOwner] = await Promise.all([
    prisma.hotel.create({
      data: {
        name: 'Sunset Paradise',
        city: 'Charlotte',
        address: '123 Lakeview Avenue',
        rating: 4.5,
        isPublished: true,
        ownerId: owner.id,
      },
    }),
    prisma.hotel.create({
      data: {
        name: 'Downtown Haven',
        city: 'Raleigh',
        address: '456 City Center Blvd',
        rating: 4.2,
        isPublished: true,
        ownerId: owner.id,
      },
    }),
    prisma.hotel.create({
      data: {
        name: 'Orphan Inn',
        city: 'Greensboro',
        address: '789 Maple Street',
        rating: 3.8,
        isPublished: false,
        ownerId: null,
      },
    }),
  ]);

  // Rooms (5+ total)
  const rooms = await Promise.all([
    prisma.room.create({
      data: {
        hotelId: hotelA.id,
        roomNumber: 101,
        capacity: 2,
        pricePerNight: 120.0,
        isPublished: true,
      },
    }),
    prisma.room.create({
      data: {
        hotelId: hotelA.id,
        roomNumber: 102,
        capacity: 4,
        pricePerNight: 180.0,
        isPublished: true,
      },
    }),
    prisma.room.create({
      data: {
        hotelId: hotelA.id,
        roomNumber: 201,
        capacity: 3,
        pricePerNight: 150.0,
        isPublished: true,
      },
    }),
    prisma.room.create({
      data: {
        hotelId: hotelB.id,
        roomNumber: 301,
        capacity: 2,
        pricePerNight: 110.0,
        isPublished: true,
      },
    }),
    prisma.room.create({
      data: {
        hotelId: hotelB.id,
        roomNumber: 302,
        capacity: 5,
        pricePerNight: 220.0,
        isPublished: true,
      },
    }),
    prisma.room.create({
      data: {
        hotelId: hotelNoOwner.id,
        roomNumber: 401,
        capacity: 2,
        pricePerNight: 90.0,
        isPublished: false,
      },
    }),
  ]);

  // Bookings (non-overlapping for capacity check)
  await Promise.all([
    prisma.booking.create({
      data: {
        roomId: rooms[0].id,
        guestId: guest1.id,
        startDate: new Date('2025-11-15'),
        endDate: new Date('2025-11-17'),
        guests: 2,
        total: 240.0,
        status: 'CONFIRMED',
      },
    }),
    prisma.booking.create({
      data: {
        roomId: rooms[1].id,
        guestId: guest2.id,
        startDate: new Date('2025-11-18'),
        endDate: new Date('2025-11-20'),
        guests: 3,
        total: 360.0,
        status: 'CONFIRMED',
      },
    }),
    prisma.booking.create({
      data: {
        roomId: rooms[2].id,
        guestId: guest1.id,
        startDate: new Date('2025-12-01'),
        endDate: new Date('2025-12-03'),
        guests: 2,
        total: 300.0,
        status: 'CANCELLED',
      },
    }),
    prisma.booking.create({
      data: {
        roomId: rooms[3].id,
        guestId: guest2.id,
        startDate: new Date('2025-12-05'),
        endDate: new Date('2025-12-07'),
        guests: 2,
        total: 220.0,
        status: 'CONFIRMED',
      },
    }),
    prisma.booking.create({
      data: {
        roomId: rooms[4].id,
        guestId: guest1.id,
        startDate: new Date('2025-12-10'),
        endDate: new Date('2025-12-12'),
        guests: 4,
        total: 440.0,
        status: 'CONFIRMED',
      },
    }),
  ]);

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
