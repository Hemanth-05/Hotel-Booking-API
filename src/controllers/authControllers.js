import { signUp, logIn } from "../services/authServices.js";

export async function signUpHandler(req, res, next) {
    try {
        const { name, email, password } = req.body;
        const newUser = await signUp(name, email, password);
        res.status(201).json({
            message: `User with id ${newUser.id} has been created`,
            userId: newUser.id
        });
    } catch (error) {
        next(error);
    }
}

export async function logInHandler(req, res, next) {
    try {
        const { email, password } = req.body;
        const { user, token } = await logIn(email, password);
        res.status(200).json({
            message: "Successfully logged in",
            userId: user.id,
            token // Bearer token
        });
    } catch (error) {
        next(error);
    }
}
