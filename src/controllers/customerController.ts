import { PrismaClient } from "@prisma/client";

export const createCustomer = async (
  customerName: string,
  userId: number,
  address?: string,
  phone?: string,
  email?: string,
  nic?: string,
  customerNature?: number
) => {
  if (!customerName || customerName.split(" ").join("").length === 0) {
    return { status: 500, message: "invalid customer name", customer: null };
  }

  if (!userId) {
      return { status: 500, message: 'user id is required', customer: null}
  }
  const prisma = new PrismaClient();
  const customer = await prisma.customers
    .create({
      data: {
        customerName,
        address,
        phone,
        email,
        nic,
        customerNature,
        createdUserId: userId,
        updatedUserId: userId,
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
        message: 'customer created',
        customer: {
            id: Number(customer.id),
            customerName: customer.customerName,
            address: customer.address,
            phone: customer.phone,
            email: customer.email,
            nic: customer.nic,
            customerNature: customer.customerNature,
            createdAt: customer.createdAt,
            createdBy: customer.createdUserId
        }
    }
};

export const getCustomerById = async (id: number) => {
    const prisma = new PrismaClient()
    const customer = await prisma.customers.findUnique({
        where: {
            id
        }
    }).catch((e: any) => {
        throw e
    }).finally(async() => {
        await prisma.$disconnect()
    })

    if (customer) {
        return {status: 200, message: 'customer found', customer: {
            id: Number(customer.id),
            customerName: customer.customerName,
            address: customer.address,
            phone: customer.phone,
            email: customer.email,
            nic: customer.nic,
            customerNature: customer.customerNature,
            balance: customer.balance,
        }}
    } else {
        return {status: 404, message: 'customer not found', customer: null}
    }
}

export const updateCustomer = async (id: number, userId: number, customerName?: string, address?: string, phone?: string, email?: string, nic?: string, customerNature?: number, balance?: number) => {
    if (!id) {
        return {status: 500, message: 'id invalid', customer: null}
    }

    if (!userId) {
        return {status: 500, message: 'user id is required', customer: null}
    }

    const checkCustomer = await getCustomerById(id)
    if (!checkCustomer.customer) {
        return checkCustomer
    }

    const prisma = new PrismaClient()

    const customer = await prisma.customers.update({
        where: {
            id
        }, data: {
            customerName,
            address,
            phone,
            email,
            nic,
            customerNature,
            balance,
            updatedAt: new Date().toISOString(),
            updatedUserId: userId
        }
    }).catch((e: any) => {
        throw e
    }).finally(async() => {
        await prisma.$disconnect()
    })

    return {status: 200, message:'customer updated', customer: {
        id: Number(customer.id),
        customerName: customer.customerName,
        address: customer.address,
        phone: customer.phone,
        email: customer.email,
        nic: customer.nic,
        customerNature: customer.customerNature,
        balance: customer.balance,
        updatedAt: customer.updatedAt,
        updatedBy: customer.updatedUserId
    }}
}

export const deleteCustomer = async(id: number) => {
    if (!id) {
        return {status: 500, message: 'id is invalid', customer: null}
    }

    const checkCustomer = await getCustomerById(id)
    if (!checkCustomer.customer) {
        return checkCustomer
    }

    const prisma = new PrismaClient()
    const customer = await prisma.customers.delete({
        where: {id}
    }).catch((e: any) => {
        throw e
    }).finally(async() => {
        await prisma.$disconnect()
    })

    return {status: 204, message: 'customer deleted', customer: {
        id: Number(customer.id),
    }}
}