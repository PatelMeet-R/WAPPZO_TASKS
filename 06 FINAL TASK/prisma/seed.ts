import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();
async function main() {
  const ADMIN = await prisma.user.upsert({
    where: { email: "admin@123" },
    update: {},
    create: {
      email: "admin@123",
      name: "admin",
      department: "Management",
      role: "ADMIN",
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
// password :admin123
