import { PrismaClient } from "@prisma/client";

export const createRefill = async (
  tanksId: number,
  refillAmount?: number,
  date?: string,
  cost?: number
) => {
  if (!tanksId) {
    return { status: 500, message: "tank is required", refill: null };
  }

  const prisma = new PrismaClient();
  const refill = await prisma.refills
    .create({
      data: {
        tanksId,
        refillAmount,
        cost,
        date,
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
    message: "refill created",
    refill: {
      id: Number(refill.id),
      cost: refill.cost,
      refillAmount: refill.refillAmount,
      tankId: Number(refill.tanksId),
      date: refill.date,
    },
  };
};

export const updateRefill = async (
  id: number,
  refillAmount?: number,
  cost?: number,
  date?: string,
  tanksId?: number
) => {
  if (!id) {
    return { status: 500, message: "refill id is required", refill: null };
  }

  const checkRefill = await getRefillById(id);
  if (!checkRefill.refill) {
    return checkRefill;
  }

  const prisma = new PrismaClient();
  const refill = await prisma.refills
    .update({
      where: {
        id,
      },
      data: {
        refillAmount,
        cost,
        date,
        tanksId,
        updatedAt: new Date().toISOString(),
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
    message: "refill updated",
    refill: {
      id: Number(refill.id),
      refillAmount: refill.refillAmount,
      date: refill.date,
      cost: refill.cost,
      tankId: Number(refill.tanksId),
      updatedAt: refill.updatedAt,
    },
  };
};

export const getRefillById = async (id: number) => {
  if (!id) {
    return { status: 500, message: "id is required", refill: null };
  }

  const prisma = new PrismaClient();
  const refill = await prisma.refills
    .findUnique({
      where: { id },
    })
    .catch((e: any) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  if (refill) {
    return {
      status: 200,
      message: "refill found",
      refill: {
        id: Number(refill.id),
        refillAmount: refill.refillAmount,
        cost: refill.cost,
        date: refill.date,
        tankId: Number(refill.tanksId),
        updatedAt: refill.updatedAt,
      },
    };
  } else {
    return { status: 404, message: "refill not found", refill: null };
  }
};

export const deleteRefill = async (id: number) => {
  if (!id) {
    return { status: 500, message: "id is invalid", refill: null };
  }

  const checkRefill = await getRefillById(id);
  if (!checkRefill.refill) {
    return checkRefill;
  }

  const prisma = new PrismaClient();
  const refill = await prisma.refills
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

  return {
    status: 204,
    message: "refill deleted",
    refill: {
      id: Number(refill.id),
    },
  };
};
