import { signUp, logIn } from "../services/authServices.js";

export async function signUpHandler(req, res){
    const{name, email, password} = req.body;
    const newUser = await signUp(name, email, password);
    res.status(201).json({message: `User with id ${newUser.id} has been created`});
}

export async function logInHandler(req, res){
    const{email, password} = req.body;
    await logIn(email, password);
    res.status(200).json({message: "Successfully logged in"});
}


