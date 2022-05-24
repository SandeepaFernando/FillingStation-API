import { PrismaClient } from "@prisma/client";

export const createTankDetails = async (
  tanksId: number,
  pumpOperatorsId: number
) => {
  if (!tanksId) {
    return { status: 500, message: "tank id is required", tankDetails: null };
  }

  if (!pumpOperatorsId) {
    return {
      status: 500,
      message: "pump operator id is required",
      tankDetails: null,
    };
  }

  const prisma = new PrismaClient();
  const tankDetails = await prisma.tankDetails
    .create({
      data: {
        tanksId,
        pumpOperatorsId,
      },
      include: {
        pumpOperator: true,
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
    message: "tank details created",
    tankDetails: {
      id: Number(tankDetails.id),
      tanks: { id: Number(tankDetails.tanksId) },
      pumpOperator: {
        id: Number(tankDetails.pumpOperator.id),
        name: tankDetails.pumpOperator.name,
      },
    },
  };
};

export const updateTankDetails = async (
  id: number,
  tanksId?: number,
  startMeter?: number,
  endMeter?: number,
  sell?: number,
  refillsId?: number,
  wastage?: number,
  pumpOperatorsId?: number,
  cost?: number
) => {
  if (!id) {
    return { status: 500, message: "id invalid", tankDetails: null };
  }

  const checkTankDetails = await getTankDetailsById(id);
  if (!checkTankDetails.tankDetails) {
    return checkTankDetails;
  }

  const prisma = new PrismaClient();
  const tankDetails = await prisma.tankDetails
    .update({
      where: { id },
      data: {
        tanksId,
        startMeter,
        endMeter,
        sell,
        refillsId,
        wastage,
        pumpOperatorsId,
        cost,
        updatedAt: new Date().toISOString(),
      },
      include: {
        tank: true,
        pumpOperator: true,
        refill: true,
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
    message: "tank details updated",
    tankDetails: {
      id: Number(tankDetails.id),
      tank: {
        id: Number(tankDetails.tank.id),
      },
      startMeter: tankDetails.startMeter,
      endMeter: tankDetails.endMeter,
      sell: tankDetails.sell,
      refill: {
        id: Number(tankDetails.refill?.id),
        date: tankDetails.refill?.date,
      },
      wastage: tankDetails.wastage,
      pumpOperator: {
        id: Number(tankDetails.pumpOperator.id),
        name: tankDetails.pumpOperator.name,
      },
      cost: tankDetails.cost,
      updatedAt: tankDetails.updatedAt,
    },
  };
};

export const getTankDetailsById = async (id: number) => {
  if (!id) {
    return { status: 500, message: "id is required", tankDetails: null };
  }

  const prisma = new PrismaClient();
  const tankDetails = await prisma.tankDetails
    .findUnique({
      where: {
        id,
      },
      include: {
        tank: true,
        pumpOperator: true,
        refill: true,
      },
    })
    .catch((e: any) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  if (tankDetails) {
    return {
      status: 200,
      message: "tank details found",
      tankDetails: {
        id: Number(tankDetails.id),
        tank: {
          id: Number(tankDetails.tank.id),
        },
        startMeter: tankDetails.startMeter,
        endMeter: tankDetails.endMeter,
        sell: tankDetails.sell,
        refill: {
          id: Number(tankDetails.refill?.id),
          date: tankDetails.refill?.date,
        },
        wastage: tankDetails.wastage,
        pumpOperator: {
          id: Number(tankDetails.pumpOperator.id),
          name: tankDetails.pumpOperator.name,
        },
        cost: tankDetails.cost,
        createdAt: tankDetails.createdAt,
        updatedAt: tankDetails.updatedAt,
      },
    };
  } else {
    return {
      status: 404,
      message: "tank details not found",
      tankDetails: null,
    };
  }
};

export const deleteTankDetails = async (id: number) => {
  if (!id) {
    return { status: 500, message: "id is required", tankDetails: null };
  }

  const checkTankDetails = await getTankDetailsById(id);
  if (!checkTankDetails.tankDetails) {
    return checkTankDetails;
  }

  const prisma = new PrismaClient();
  const tankDetails = await prisma.tankDetails
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
    message: "tank details deleted",
    tankDetails: {
      id: Number(tankDetails.id),
    },
  };
};
