import { PrismaClient } from "@prisma/client";

export const createPumpOperator = async (
  name: string,
  address?: string,
  phone?: string,
  nic?: string
) => {
  const prisma = new PrismaClient();

  if (!name || name.split(" ").join("").length === 0) {
    return { status: 500, message: "name is invalid", pumpOperator: null };
  }

  const operator = await prisma.pumpOperators
    .create({
      data: {
        name,
        address,
        phone,
        nic,
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
    message: "pump operator created",
    pumpOperator: {
      id: Number(operator.id),
      name: operator.name,
      address: operator.address,
      phone: operator.phone,
      nic: operator.nic,
    },
  };
};

export const updateOperator = async (
  id: number,
  name?: string,
  address?: string,
  phone?: string,
  nic?: string,
  balance?: number
) => {
  if (!id) {
    return { status: 500, message: "id invalid", pumpOperator: null };
  }

  const checkOperator = await getPumpOperatorByid(id)
  
  if (!checkOperator.pumpOperator) {
      return checkOperator
    }
    
const prisma = new PrismaClient();
  const operator = await prisma.pumpOperators
    .update({
      where: { id },
      data: {
        name,
        address,
        phone,
        nic,
        balance,
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
    message: "pump operator updated",
    pumpOperator: {
      id: Number(operator.id),
      name: operator.name,
      address: operator.address,
      phone: operator.phone,
      nic: operator.nic,
      balance: operator.balance,
    },
  };
};

export const getPumpOperatorByid = async (id: number) => {
    if (!id) {
        return {status: 500, message: 'id is invalid', pumpOperator: null}
    }

    const prisma = new PrismaClient()
    const operator = await prisma.pumpOperators.findUnique({
        where: {id}
    }).catch((e: any) => {
        throw e
    }).finally(async() => {
        await prisma.$disconnect()
    })

    if (operator) {
        return {status: 200, message: 'operator found', pumpOperator: {
            id: Number(operator.id),
            name: operator.name,
            address: operator.address,
            phone: operator.phone,
            nic: operator.nic,
            balance: operator.balance
        }}
    } else {
        return {status: 404, message: 'operator not found', pumpOperator: null}
    }
}

export const deleteOperator = async (id: number) => {
    if (!id) {
        return {status: 500, message: 'id is invalid', pumpOperator: null} 
    }

    const checkOperator = await getPumpOperatorByid(id)
    
    if(!checkOperator.pumpOperator) {
        return checkOperator
    }
    
    const prisma = new PrismaClient()
    const operator = await prisma.pumpOperators.delete({
        where: {id}
    }).catch((e:any) => {
        throw e
    }).finally(async() => {
        await prisma.$disconnect()
    })

    return {
        status: 204,
        message: 'operator deleted',
        pumpOperator: {
          id: Number(operator.id) 
        }        
    }
}