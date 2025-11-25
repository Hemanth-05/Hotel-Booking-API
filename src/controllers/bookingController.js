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
export async function createBooking(req, res, next) {
  try {
    const booking = await createBookingService({
      ...req.body,
      userId: req.user.id
    });
    return res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
}

// USER – GET own bookings
export async function getUserBookings(req, res, next) {
  try {
    const bookings = await getUserBookingsService(req.user.id);
    return res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
}

// OWNER – GET bookings for owned hotels
export async function getOwnerBookings(req, res, next) {
  try {
    const bookings = await getOwnerBookingsService(
      req.user.id,
      req.query.hotelId
    );
    return res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
}

// ADMIN – GET all bookings
export async function getAdminBookings(req, res, next) {
  try {
    const bookings = await getAdminBookingsService();
    return res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
}

// UPDATE booking
export async function updateBooking(req, res, next) {
  try {
    const updated = await updateBookingService(Number(req.params.id), req.body);
    return res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}

// CANCEL booking
export async function cancelBooking(req, res, next) {
  try {
    const cancelled = await cancelBookingService(Number(req.params.id));
    return res.status(200).json(cancelled);
  } catch (err) {
    next(err);
  }
}

// DELETE (Admin)
export async function deleteBooking(req, res, next) {
  try {
    await deleteBookingService(Number(req.params.id));
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}
