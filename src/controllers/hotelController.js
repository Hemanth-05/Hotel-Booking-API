import {
  createHotelServices,
  getAdminHotelsServices,
  getOwnerHotelsServices,
  updateHotelServices,
  deleteHotelServices,
} from "../services/hotelService.js";

export async function createHotel(req, res, next) {
  try {
    const hotel = await createHotelServices(req.body);
    res.status(201).json(hotel);
  } catch (err) {
    next(err);
  }
}

export async function getAllHotels(req, res, next) {
  try {
    const hotels = await getAdminHotelsServices();
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
}

export async function getOwnerHotels(req, res, next) {
  try {
    const hotels = await getOwnerHotelsServices(req.user.id);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
}

export async function updateHotel(req, res, next) {
  try {
    const updated = await updateHotelServices(
      Number(req.params.id),
      req.body
    );
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}

export async function assignOwner(req, res, next) {
  try {
    const updated = await updateHotelServices(Number(req.params.id), {
      ownerId: req.body.ownerId,
    });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteHotel(req, res, next) {
  try {
    await deleteHotelServices(Number(req.params.id));
    res.status(204).json({ message: "Hotel deleted" });
  } catch (err) {
    next(err);
  }
}
