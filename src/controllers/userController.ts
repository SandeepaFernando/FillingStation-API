import { PrismaClient } from "@prisma/client";

export const createUser = async (
  userName: string,
  nic: string,
  userRole: number,
  password: string
) => {
  const prisma = new PrismaClient();
  if (!userName || userName.split(" ").join("").length === 0) {
    return { status: 500, message: "username is invalid", user: null };
  }
  if (!nic || nic.split(" ").join("").length === 0) {
    return { status: 500, message: "nic is invalid", user: null };
  }
  if (!password || password.split(" ").join("").length === 0) {
    return { status: 500, message: "password is invalid", user: null };
  }
  if (!userRole) {
    userRole = 1;
  }

  const checkUser = await getUserByUserName(userName);

  if (checkUser) {
    return { status: 403, message: "username already exists", user: null };
  }

  const user = await prisma.users
    .create({
      data: {
        userName,
        nic,
        userRole,
        password,
      },
    })
    .catch((e: any) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  return {
    status: 200,
    message: "user created",
    user: {
      id: Number(user.id),
      userName: user.userName,
      nic: user.nic,
      userRole: user.userRole,
    },
  };
};

export const deleteUserById = async (id: number) => {
  const prisma = new PrismaClient();

  if (!id) {
    return {
      status: 500,
      message: "id is invalid",
      user: null,
    };
  }

  const user = await prisma.users
    .delete({
      where: {
        id,
      },
    })
    .catch((e: any) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  if (user) {
    return {
      status: 204,
      message: "user deleted",
      user: {
        id: Number(user.id),
        userName: user.userName,
      },
    };
  } else {
    return {
      status: 404,
      message: "user not found",
      user: null,
    };
  }
};

export const updateUser = async (
  id: number,
  userName: string,
  nic: string,
  userRole: number,
  password: string
) => {
  const prisma = new PrismaClient();
  if (!id) {
    return { status: 500, message: "id is not valid", user: null };
  }
  if (!userName || userName.split(" ").join("").length === 0) {
    return { status: 500, message: "username is invalid", user: null };
  }
  if (!nic || nic.split(" ").join("").length === 0) {
    return { status: 500, message: "nic is invalid", user: null };
  }
  if (!password || password.split(" ").join("").length === 0) {
    return { status: 500, message: "password is invalid", user: null };
  }

  const checkUser = await getUserByUserName(userName);
  if (checkUser) {
    return { status: 403, message: "username exists", user: null };
  }

  const user = await prisma.users
    .update({
      where: {
        id,
      },
      data: {
        userName,
        userRole,
        password,
        nic,
        lastUpdatedAt: new Date().toISOString(),
      },
    })
    .catch((e: any) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  return {
    status: 200,
    message: "user updated",
    user: {
      id: Number(user.id),
      userName: user.userName,
      nic: user.nic,
      userRole: user.userRole,
    },
  };
};

export const getUserById = async (id: number) => {
  const prisma = new PrismaClient();

  const user = await prisma.users
    .findUnique({
      where: {
        id,
      },
    })
    .catch((e: any) => {
      throw e;
    })
    .finally(async () => {
      prisma.$disconnect();
    });

  if (user) {
    return {
      status: 200,
      message: "user found",
      user: {
        id: Number(user.id),
        userName: user.userName,
        nic: user.nic,
        userRole: user.userRole,
        cashInHand: user.cashInHand,
      },
    };
  } else {
    return {
      status: 404,
      message: "user not found",
      user: null,
    };
  }
};

export const getUserByUserName = async (userName: string) => {
  const prisma = new PrismaClient();

  const user = await prisma.users
    .findFirst({
      where: {
        userName,
      },
    })
    .catch((e: any) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  return user;
};
