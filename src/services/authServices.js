import bcrypt from 'bcrypt';
import {Prisma} from '../generated/prisma/index.js'
import { createUser, findUserByEmail } from '../respositories/userRepo.js';

export async function signUp(name, email, password){
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        const newUser = await createUser({name, email, password: hashedPassword});
        return newUser;
    }catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2002'){
                const error = new Error("Email has already been used");
                error.status = 409;
                throw error;
            }
            throw error;
        }
    }
}

export async function logIn(email, password){
    const user = await findUserByEmail(email);

    if(!user){
        const error = new Error("Invalid credentials");
        error.status = 401;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        const error = new Error("invalid credentials");
        error.status = 401;
        throw error;
    }

    return;
}