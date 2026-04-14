import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient()

async function createTodo(){
    
    const newUser = await prisma.user.create({
    data: {
        username: "john_doe",
        password: "hashed_password_here",
        firstName: "John",
        lastName: "Doe",
    },
    });

}

createTodo();