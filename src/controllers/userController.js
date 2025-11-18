import { updateUser, deleteUser, getUserById, getAllUsers, getHotelGuests } from "../services/userServices.js";

export const getMe = async (req, res, next) => {
    try {
        const user = await getUserById(req.user.id);
        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
};

export const updateMe = async (req, res, next) => {
    try {
        const { name, password } = req.body;
        const updatedUser = await updateUser(req.user.id, name, password);
        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        next(error);
    }
};

export const deleteMe = async (req, res, next) => {
    try {
        await deleteUser(req.user.id);
        res.status(204).json({});
    } catch (error) {
        next(error);
    }
};

export const getAllUsersHandler = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({ users });
    } catch (error) {
        next(error);
    }
};

export const getHotelGuestsHandler = async (req, res, next) => {
    try {
        const hotelId = parseInt(req.params.hotelId);
        const guests = await getHotelGuests(hotelId, req.user.id);
        res.status(200).json({ guests });
    } catch (error) {
        next(error);
    }
};
