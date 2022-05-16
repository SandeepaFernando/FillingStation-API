import { prisma, PrismaClient } from "@prisma/client";

export const createBranch = async (
  branchName: string,
  usersId: number,
  phone?: string,
  address?: string
) => {
  const prisma = new PrismaClient();

  if (!branchName || branchName.split(" ").join("").length === 0) {
    return { status: 500, message: "branchName is invalid", branch: null };
  }

  if (!usersId) {
    return { status: 500, message: "invalid user id", branch: null };
  }

  const branch = await prisma.branches
    .create({
      data: {
        branchName,
        usersId,
        phone,
        address,
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
    message: "branch created",
    branch: {
      id: Number(branch.id),
      branchName: branchName,
      phone: branch.phone,
      address: branch.address,
    },
  };
};

export const updateBranch = async (
  id: number,
  branchName: string,
  usersId: number,
  phone?: string,
  address?: string
) => {
  const prisma = new PrismaClient();

  if (!id) {
    return { status: 500, message: "id invalid", branch: null };
  }

  const checkBranch = await getBranchById(id);
  if (!checkBranch.branch) {
    return checkBranch;
  }

  const branch = await prisma.branches
    .update({
      where: {
        id,
      },
      data: {
        branchName,
        address,
        phone,
        usersId,
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
    message: "branch updated",
    branch: {
      id: Number(branch.id),
      branchName: branch.branchName,
      phone: branch.phone,
      address: branch.address,
    },
  };
};

export const getBranchById = async (id: number) => {
  const prisma = new PrismaClient();

  if (!id) {
    return { status: 500, message: "id invalid", branch: null };
  }

  const branch = await prisma.branches
    .findUnique({
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

  if (branch) {
    return {
      status: 200,
      message: "branch found",
      branch: {
        id: Number(branch.id),
        branchName: branch.branchName,
        address: branch.address,
        phone: branch.phone,
      },
    };
  } else {
    return { status: 404, message: "branch not found", branch: null };
  }
};

export const deleteBranch = async (id: number) => {
  const prisma = new PrismaClient();

  if (!id) {
    return { status: 500, message: "id invalid", branch: null };
  }

  const checkBranch = await getBranchById(id);

  if (!checkBranch.branch) {
    return checkBranch;
  }

  const branch = await prisma.branches
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
    message: "branch deleted",
    branch: {
      id: Number(branch.id),
      branchName: branch.branchName,
    },
  };
};
