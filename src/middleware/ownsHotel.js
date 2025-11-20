import prisma from "../config/db.js";

export async function ownsHotel(req, res, next) {
  const id = Number(req.params.id);

  const hotel = await prisma.hotel.findUnique({
    where: { id },
  });

  if (!hotel) return res.status(404).json({ message: "Hotel not found" });

  if (req.user.role === "ADMIN") return next();

  if (hotel.ownerId !== req.user.id) {
    return res.status(403).json({ message: "Access denied. Not your hotel." });
  }

  next();
}
