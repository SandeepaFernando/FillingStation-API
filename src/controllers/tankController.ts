import { PrismaClient } from "@prisma/client";

export const createTank = async (userId: number, item: number) => {
  if (!userId || isNaN(userId)) {
    return { status: 500, message: "invalid userId", tank: null };
  }

  if (!item || isNaN(item)) {
    return { status: 500, message: "invalid itemId", tank: null };
  }

  const prisma = new PrismaClient();

  const tank = await prisma.tanks
    .create({
      data: {
        usersId: userId,
        itemsId: item,
      },
      include: {
        item: true,
        createdBy: true,
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
    message: "tank created",
    tank: {
      id: Number(tank.id),
      remainQty: tank.remainQty,
      createdBy: {
        id: Number(tank.createdBy.id),
        name: tank.createdBy.userName,
        createdAt: tank.updatedAt,
      },
      item: {
        itemId: Number(tank.item.id),
        itemName: tank.item.itemName,
      },
    },
  };
};

export const updateTank = async (
  tankId: number,
  remainQty?: number,
  item?: number
) => {
  if (!tankId || isNaN(tankId)) {
    return { status: 500, message: "invalid tankId", tank: null };
  }

  const checkTank = await getTankById(tankId);
  if (!checkTank) {
    return checkTank;
  }

  const prisma = new PrismaClient();
  const tank = await prisma.tanks
    .update({
      where: {
        id: tankId,
      },
      data: {
        remainQty,
        itemsId: item,
        updatedAt: new Date().toISOString(),
      },
      include: {
        item: true,
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
    message: "tank update",
    tank: {
      id: Number(tank.id),
      remainQty: tank.remainQty,
      updatedAt: tank.updatedAt,
      item: {
        itemId: Number(tank.item.id),
        itemName: tank.item.itemName,
      },
    },
  };
};

export const getTankById = async (id: number) => {
  if (!id) {
    return { status: 500, message: "id is invalid", tank: null };
  }

  const prisma = new PrismaClient();
  const tank = await prisma.tanks
    .findUnique({
      where: {
        id,
      },
      include: {
        item: true,
      },
    })
    .catch((e: any) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  if (tank) {
    return {
      status: 200,
      message: "tank found",
      tank: {
        id: Number(tank.id),
        remainQty: tank.remainQty,
        item: {
          itemId: Number(tank.item.id),
          itemName: tank.item.itemName,
        },
      },
    };
  } else {
    return { status: 404, message: "tank not found", tank: null };
  }
};

export const deleteTank = async (id: number) => {
  if (!id) {
    return { status: 500, message: "id is invalid", tank: null };
  }

  const checkTank = await getTankById(id);
  if (!checkTank) {
    return checkTank;
  }

  const prisma = new PrismaClient();
  const tank = await prisma.tanks
    .delete({
      where: { id },
    })
    .catch((e: any) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  return {
    status: 204,
    message: "tank deleted",
    tank: {
      id: Number(tank.id),
    },
  };
};
