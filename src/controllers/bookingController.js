import {
  createBookingService,
  getUserBookingsService,
  getOwnerBookingsService,
  getAdminBookingsService,
  updateBookingService,
  cancelBookingService,
  deleteBookingService,
  getBookingByIdService
} from "../services/bookingService.js";

// CREATE booking
export async function createBooking(req, res) {
  try {
    const booking = await createBookingService({
      ...req.body,
      userId: req.user.id
    });
    return res.status(201).json(booking);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

// USER – GET own bookings
export async function getUserBookings(req, res) {
  try {
    const bookings = await getUserBookingsService(req.user.id);
    return res.status(200).json(bookings);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// OWNER – GET bookings for owned hotels
export async function getOwnerBookings(req, res) {
  try {
    const bookings = await getOwnerBookingsService(
      req.user.id,
      req.query.hotelId
    );
    return res.status(200).json(bookings);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// ADMIN – GET all bookings
export async function getAdminBookings(req, res) {
  try {
    const bookings = await getAdminBookingsService();
    return res.status(200).json(bookings);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// UPDATE booking
export async function updateBooking(req, res) {
  try {
    const updated = await updateBookingService(Number(req.params.id), req.body);
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

// CANCEL booking
export async function cancelBooking(req, res) {
  try {
    const cancelled = await cancelBookingService(Number(req.params.id));
    return res.status(200).json(cancelled);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

// DELETE (Admin)
export async function deleteBooking(req, res) {
  try {
    await deleteBookingService(Number(req.params.id));
    return res.status(204).send();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
