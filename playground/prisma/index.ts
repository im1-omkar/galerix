// src/index.ts
import { prisma } from "./src/db.ts";

async function createUser() {
  const newUser = await prisma.user.create({
    data: {
        email : "hellothere@gmail.com",
        name  : "hellothere"
    },
  });

  console.log(newUser);
}

createUser();