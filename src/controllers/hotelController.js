import * as hotelService from "../services/hotelService.js";

export async function createHotel(req, res) {
  try {
    const hotel = await hotelService.createHotel(req.body);
    res.status(201).json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getAllHotels(req, res) {
  try {
    const hotels = await hotelService.getAdminHotels();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getOwnerHotels(req, res) {
  try {
    const hotels = await hotelService.getOwnerHotels(req.user.id);
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateHotel(req, res) {
  try {
    const updated = await hotelService.updateHotel(
      Number(req.params.id),
      req.body
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function assignOwner(req, res) {
  try {
    const updated = await hotelService.updateHotel(Number(req.params.id), {
      ownerId: req.body.ownerId,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteHotel(req, res) {
  try {
    await hotelService.deleteHotel(Number(req.params.id));
    res.json({ message: "Hotel deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
