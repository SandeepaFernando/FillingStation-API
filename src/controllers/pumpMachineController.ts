import { PrismaClient } from "@prisma/client";

export const createPumpMachine = async (pumpName: string, meter: number, pumpOperator: number, tank: number) => {
    if (!pumpName) {
        return {status: 500, message: 'invalid pump name', pumpMachine: null}
    }
    if (!meter) {
        return {status: 500, message: 'inavlid meter', pumpMachine: null}
    }
    if (!pumpOperator) {
        return {status: 500, message: 'invalid pump operator', pumpMachine: null}
    }
    if (!tank) {
        return {status: 500, message: 'invalid tank', pumpMachine: null}
    }


    const prisma = new PrismaClient()
    const pumpMachine = await prisma.pumpMachine.create({
        data: {
            pumpName,
            meter,
            pumpOperatorsId: pumpOperator,
            tanksId: tank
        }, include: {
            tank: true,
            pumpOperator: true
        }
    }).catch((e:any) => {
        throw e
    }).finally(async() => {
        await prisma.$disconnect()
    })

    return {status: 200, message: 'pump machine created', pumpMachine: {
        id: Number(pumpMachine.id),
        pumpName: pumpMachine.pumpName,
        meter: pumpMachine.meter,
        tank: {
            id: Number(pumpMachine.tank.id)
        }, 
        pumpOperator: {
            id: Number(pumpMachine.pumpOperator.id),
            name: pumpMachine.pumpOperator.name
        }
        createdAt: pumpMachine.createdAt
    }}
}

export const getPumpMachineById = async(id: number) => {
    if (!id) {
        return {status: 500, message: 'id is required', pumpMachine: null}
    }

    const prisma = new PrismaClient()
    const pumpMachine = await prisma.pumpMachine.findUnique({
        where: {id},include:{tank: true, pumpOperator: true}
    }).catch((e: any) => {
        throw e
    }).finally(async() => {
        await prisma.$disconnect()
    })

    if (pumpMachine) {
        return {status: 200, message: 'pump machine found', 
            pumpMachine: {
                id: Number(id),
                pumpName: pumpMachine.pumpName,
                meter: pumpMachine.meter,
                tank: {
                    id: Number(pumpMachine.tank.id)
                },
                pumpOperator: {
                    id: Number(pumpMachine.pumpOperator.id),
                    name: pumpMachine.pumpOperator.name
                },
                createdAt: pumpMachine.createdAt,
                updatedAt: pumpMachine.updatedAt
            }    
        }
    } else {
        return {status: 404, message: 'pump machine not found', pumpMachine: null}
    }
}

export const updatePumpMachine = async (id: number, pumpName?: string, meter?: number, pumpOperator?: number, tank?: number) => {
    if (!id) {
        return {status: 500, message: 'invalid id', pumpMachine: null}
    } 

    const checkPumpMachine = await getPumpMachineById(id) 
    if (!checkPumpMachine) {
        return checkPumpMachine
    }

    const prisma = new PrismaClient()
    const pumpMachine = await prisma.pumpMachine.update({
        where: {id},
        data: {
            pumpName,
            meter,
            pumpOperatorsId: pumpOperator,
            tanksId: tank,
            updatedAt: new Date().toISOString()
        }, include: {
            tank: true,
            pumpOperator: true
        }
    }).catch((e: any) => {
        throw e
    }).finally(async() => {
        await prisma.$disconnect()
    })
    
    return {status: 200, 
        message: 'pump machine update', 
        pumpMachine: {
            id: Number(pumpMachine.id),
            pumpName: pumpMachine.pumpName,
            meter: pumpMachine.meter,
            tank: {
                id: Number(pumpMachine.tank.id)
            }, pumpOperator: {
                id: Number(pumpMachine.pumpOperator.id),
                name: pumpMachine.pumpOperator.name
            },
            createdAt: pumpMachine.createdAt,
            updatedAt: pumpMachine.updatedAt
        }
    }
}

export const deletePumpMachine = async (id: number) => {
    if (!id) {
        return {status: 500, message: 'id is required', pumpMachine: null}
    }

    const checkPumpMachine = await getPumpMachineById(id)
    if (!checkPumpMachine) {
        return checkPumpMachine
    } 

    const prisma = new PrismaClient()
    const pumpMachine = await prisma.pumpMachine.delete({where:{id}}).catch((e: any) => {
        throw e
    }).finally(async() => {
        await prisma.$disconnect()
    })

    return {status: 204, message: 'pump machine deleted', pumpMachine: {
        id: Number(pumpMachine.id)
    }}
}