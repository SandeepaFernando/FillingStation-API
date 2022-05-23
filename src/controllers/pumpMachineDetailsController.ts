import { PrismaClient } from "@prisma/client";

export const createPumpMachineDetails = async (
  pumpOperator: number,
  pumpMachine: number,
  startMeter: number,
  endMeter: number
) => {
  if (!pumpOperator || isNaN(pumpOperator)) {
    return {
      status: 500,
      message: "pump operator id is required",
      pumpMachineDetails: null,
    };
  }
  if (!pumpMachine || isNaN(pumpMachine)) {
    return {
      status: 500,
      message: "pump machine id is required",
      pumpMachineDetails: null,
    };
  }
  if (!startMeter || isNaN(startMeter)) {
    return {
      status: 500,
      message: "start meter is required",
      pumpMachineDetails: null,
    };
  }
  if (!endMeter || isNaN(endMeter)) {
    return {
      status: 500,
      message: "end meter is required",
      pumpMachineDetails: null,
    };
  }

  const prisma = new PrismaClient();

  const pumpMachineDetails = await prisma.pumpMachineDetails
    .create({
      data: {
        pumpOperatorsId: pumpOperator,
        pumpMachinesId: pumpMachine,
        startMeter,
        endMeter,
      },
      include: {
        pumpMachine: true,
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
    message: "pump machine details created",
    pumpMachineDetails: {
      id: Number(pumpMachineDetails.id),
      pumpOperator: {
        id: Number(pumpMachineDetails.pumpOperator.id),
        name: pumpMachineDetails.pumpOperator.name,
      },
      pumpMachine: {
        id: Number(pumpMachineDetails.pumpMachine.id),
      },
      startMeter: pumpMachineDetails.startMeter,
      endMeter: pumpMachineDetails.endMeter,
      createdAt: pumpMachineDetails.createdAt,
    },
  };
};

export const getPumpMachineDetailsById = async (id: number) => {
  if (!id) {
    return { status: 500, message: "inavlid id", pumpMachineDetails: null };
  }

  const prisma = new PrismaClient();
  const pumpMachineDetails = await prisma.pumpMachineDetails.findUnique({
    where: {
      id,
    },
    include: {
      pumpMachine: true,
      pumpOperator: true,
    },
  });

  if (pumpMachineDetails) {
    return {
      status: 200,
      message: "pump machine details found",
      pumpMachineDetails: {
        id: Number(pumpMachineDetails.id),
        pumpOperator: {
          id: Number(pumpMachineDetails.pumpOperator.id),
          name: pumpMachineDetails.pumpOperator.name,
        },
        pumpMachine: {
          id: Number(pumpMachineDetails.pumpMachine.id),
        },
        startMeter: pumpMachineDetails.startMeter,
        endMeter: pumpMachineDetails.endMeter,
        createdAt: pumpMachineDetails.createdAt,
      },
    };
  } else {
    return {
      status: 404,
      message: "pump machine details not found",
      pumpMachineDetails: null,
    };
  }
};

export const updatePumpMachineDetails = async (
  id: number,
  pumpOperator?: number,
  pumpMachine?: number,
  startMeter?: number,
  endMeter?: number
) => {
  if (!id) {
    return { status: 500, message: "id invalid", pumpMachineDetails: null };
  }

  const checkDetails = await getPumpMachineDetailsById(id);
  if (!checkDetails.pumpMachineDetails) {
    return checkDetails;
  }

  const prisma = new PrismaClient();
  const pumpMachineDetails = await prisma.pumpMachineDetails
    .update({
      where: { id },
      data: {
        pumpOperatorsId: pumpOperator,
        pumpMachinesId: pumpMachine,
        startMeter,
        endMeter,
        updatedAt: new Date().toISOString(),
      },
      include: {
        pumpMachine: true,
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
    message: "pump machine details updated",
    pumpMachineDetails: {
      id: Number(pumpMachineDetails.id),
      pumpOperator: {
        id: Number(pumpMachineDetails.pumpOperator.id),
        name: pumpMachineDetails.pumpOperator.name,
      },
      pumpMachine: {
        id: Number(pumpMachineDetails.pumpMachine.id),
      },
      startMeter: pumpMachineDetails.startMeter,
      endMeter: pumpMachineDetails.endMeter,
      updatedAt: pumpMachineDetails.updatedAt,
    },
  };
};

export const deletePumpMachineDetails = async (id: number) => {
  if (!id) {
    return { status: 500, message: "id invalid", pumpMachineDetails: null };
  }

  const checkDetails = await getPumpMachineDetailsById(id);
  if (!checkDetails.pumpMachineDetails) {
    return checkDetails;
  }

  const prisma = new PrismaClient();
  const pumpMachineDetails = await prisma.pumpMachineDetails
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
    message: "pump machine details deleted",
    pumpMachineDetails: {
      id: Number(pumpMachineDetails.id),
    },
  };
};
