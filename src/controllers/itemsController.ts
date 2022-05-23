import { PrismaClient } from "@prisma/client";

export const createItem = async (
  vendor: number,
  itemName: string,
  sellingPrice: number,
  editable: boolean,
  userId: number,
  qty: number,
  min: number,
  max: number,
  cost: number,
  measurementType: number
) => {
  if (!vendor) {
    return { status: 500, message: "vendor is required", item: null };
  }
  if (!itemName || itemName.split(" ").join("").length === 0) {
    return { status: 500, message: "item name is required", item: null };
  }
  if (!sellingPrice) {
    return { status: 500, message: "selling price is required", item: null };
  }
  if (!userId) {
    return { status: 500, message: "userId is required", item: null };
  }

  if (!editable) {
    editable = false;
  }

  if (!measurementType) {
    measurementType = 0;
  }

  const prisma = new PrismaClient();
  const item = await prisma.items
    .create({
      data: {
        vendorsId: vendor,
        itemName,
        qty,
        min,
        max,
        cost,
        sellingPrice,
        measurementType,
        editable,
        usersId: userId,
      },
      include: {
        vendor: true,
        updatedBy: true,
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
    message: "item created",
    item: {
      id: Number(item.id),
      itemName: item.itemName,
      qty: item.qty,
      min: item.min,
      max: item.max,
      cost: item.cost,
      sellingPrice: item.sellingPrice,
      measurementType: item.measurementType,
      editable: item.editable,
      createdBy: {
        id: Number(item.updatedBy.id),
        name: item.updatedBy.userName,
        createdAt: item.updatedAt,
      },
      vendor: {
        id: Number(item.vendor.id),
        name: item.vendor.vendorName,
      },
    },
  };
};

export const getItemById = async (id: number) => {
  if (!id) {
    return { status: 500, message: "id is required", item: null };
  }

  const prisma = new PrismaClient();
  const item = await prisma.items
    .findUnique({
      where: {
        id,
      },
      include: {
        vendor: true,
      },
    })
    .catch((e: any) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  if (item) {
    return {
      status: 200,
      message: "item found",
      item: {
        id: Number(item.id),
        itemName: item.itemName,
        qty: item.qty,
        min: item.min,
        max: item.max,
        const: item.cost,
        sellingPrice: item.sellingPrice,
        measurementType: item.measurementType,
        editable: item.editable,
        vendor: {
          id: Number(item.vendor.id),
          vendorName: item.vendor.vendorName,
        },
      },
    };
  } else {
    return { status: 404, message: "item not found", item: null };
  }
};

export const editItem = async (
  id: number,
  userId: number,
  vendor?: number,
  itemName?: string,
  qty?: number,
  min?: number,
  max?: number,
  cost?: number,
  sellingPrice?: number,
  measurementType?: number,
  editable?: boolean
) => {
  if (!id) {
    return { status: 500, message: "id is invalid", item: null };
  }

  if (!userId) {
    return { status: 500, message: "user id is required", item: null };
  }

  const checkItem = await getItemById(id);
  if (!checkItem.item) {
    return checkItem;
  }

  const prisma = new PrismaClient();

  const item = await prisma.items
    .update({
      where: {
        id,
      },
      data: {
        vendorsId: vendor,
        itemName,
        qty,
        min,
        max,
        cost,
        sellingPrice,
        measurementType,
        editable,
        usersId: userId,
        updatedAt: new Date().toISOString(),
      },
      include: {
        vendor: true,
        updatedBy: true,
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
    message: "item updated",
    item: {
      id: Number(item.id),
      itemName: item.itemName,
      qty: item.qty,
      min: item.min,
      max: item.max,
      cost: item.cost,
      sellingPrice: item.sellingPrice,
      measurementType: item.measurementType,
      editable: item.editable,
      vendor: {
        id: Number(item.vendor.id),
        vendorName: item.vendor.vendorName,
      },
      updatedBy: {
        id: Number(item.updatedBy.id),
        name: item.updatedBy.userName,
        updatedAt: item.updatedAt,
      },
    },
  };
};

export const deleteItem = async (id: number) => {
  if (!id) {
    return { status: 500, message: "id is required", item: null };
  }

  const checkItem = await getItemById(id);
  if (!checkItem.item) {
    return checkItem;
  }

  const prisma = new PrismaClient();

  const item = await prisma.items
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
    message: "item deleted",
    item: {
      id: Number(item.id),
      itemName: item.itemName,
    },
  };
};
