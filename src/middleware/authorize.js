import prisma from '../config/db.js';

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'You do not have permission to perform this action'
      });
    }
    next();
  };
};

// For Owner to access only their own hotel
export const ownsHotel = async (req, res, next) => {
  const hotelId = parseInt(req.params.hotelId || req.params.id);
  
  const hotel = await prisma.hotel.findUnique({
    where: { id: hotelId },
    select: { ownerId: true }
  });

  if (!hotel || (hotel.ownerId !== req.user.id && req.user.role !== 'ADMIN')) {
    return res.status(403).json({
      error: 'You do not own this hotel'
    });
  }
  next();
};