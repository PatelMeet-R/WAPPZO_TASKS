import { PrismaClient } from "../generated/prisma";
import bcyptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashPass = await bcyptjs.hash("123", 10);
  const ADMIN = await prisma.user.upsert({
    where: { email: "admin@123" },
    update: {
      department: "Management",
      role: "USER",
    },
    create: {
      email: "admin@123",
      name: "admin",
      department: "Management",
      role: "USER",
      password: hashPass,
      logStatus: "accepted",
    },
  });

  console.log({ ADMIN });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

