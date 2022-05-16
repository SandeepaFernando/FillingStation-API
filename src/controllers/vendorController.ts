import { PrismaClient } from "@prisma/client";

export const createVendor = async (
  vendorName: string,
  user: number,
  address?: string,
  phone?: string,
  email?: string
) => {
  const prisma = new PrismaClient();
  if (!vendorName || vendorName.split(" ").join("").length === 0) {
    return { status: 500, message: "invalid vendor name", vendor: null };
  }
  console.log(user);

  const vendor = await prisma.vendors
    .create({
      data: {
        vendorName,
        createdUserId: user,
        updatedUserId: user,
        address,
        phone,
        email,
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
    message: "vendor created",
    vendor: {
      id: Number(vendor.id),
      vendorName: vendor.vendorName,
      address: vendor.address,
      phone: vendor.phone,
      email: vendor.email,
    },
  };
};

export const updateVendor = async (
  id: number,
  user: number,
  vendorName?: string,
  address?: string,
  phone?: string,
  email?: string,
  balance?: number
) => {
  const prisma = new PrismaClient();

  if (!id) {
    return { status: 500, message: "id is invalid", vendor: null };
  }

  if (!vendorName || vendorName.split(" ").join("").length === 0) {
    return { status: 500, message: "vendor name is invalid", vendor: null };
  }

  const checkVendor = await getVendorById(id);

  if (!checkVendor.vendor) {
    return checkVendor;
  }

  const vendor = await prisma.vendors
    .update({
      where: {
        id,
      },
      data: {
        vendorName,
        address,
        phone,
        email,
        balance,
        updatedAt: new Date().toISOString(),
        updatedUserId: user,
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
    message: "vendor updated",
    vendor: {
      id,
      vendorName: vendor.vendorName,
      address: vendor.address,
      phone: vendor.phone,
      email: vendor.email,
      balance: vendor.balance,
    },
  };
};

export const deleteVendor = async (id: number) => {
  const prisma = new PrismaClient();

  if (!id) {
    return { status: 500, message: "vendor id invalid", vendor: null };
  }

  const checkVendor = await getVendorById(id);

  if (!checkVendor.vendor) {
    return checkVendor;
  }

  const vendor = await prisma.vendors
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

  if (vendor) {
    return {
      status: 204,
      message: "vendor deleted",
      vendor: {
        id: id,
        vendorName: vendor.vendorName,
      },
    };
  } else {
    return {
      status: 404,
      message: "vendor not found",
      vendor: null,
    };
  }
};

export const getVendorById = async (id: number) => {
  const prisma = new PrismaClient();

  if (!id) {
    return { status: 500, message: "vendor id invalid", vendor: null };
  }

  const vendor = await prisma.vendors
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

  if (vendor) {
    return {
      status: 200,
      message: "vendor found",
      vendor: {
        vendorName: vendor.vendorName,
        address: vendor.address,
        phone: vendor.phone,
        email: vendor.email,
        balance: vendor.balance,
      },
    };
  } else {
    return { status: 404, message: "vendor not found", vendor: null };
  }
};
