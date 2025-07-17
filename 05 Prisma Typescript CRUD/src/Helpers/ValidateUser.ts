import prisma from "../../prisma";

const findUserById = async (userId: string) => {
  const userInfo = await prisma.user.findUnique({
    where: { id: userId },
  });
  return userInfo;
};

export { findUserById };
