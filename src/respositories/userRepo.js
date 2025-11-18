import prisma from '../config/db.js'

export async function createUser(data){
    return await prisma.user.create({
  data,
  select: { id: true, name: true, email: true, role: true }
    });
}

export async function findUserByEmail(email){
    return await prisma.user.findUnique({where: {email}});
}