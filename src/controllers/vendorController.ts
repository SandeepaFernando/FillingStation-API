import { PrismaClient } from "@prisma/client";

export const createVendor = async(vendorName: string, address?: string, phone?: string, email?: string) => {
    const prisma = new PrismaClient()
}

export const updateVendor = async(vendorName?: string, address?: string, phone?: string, email?: string) => {
    const prisma = new PrismaClient()   
}

export const deleteVendor = async(id: number) => {
    const prisma = new PrismaClient()
}

export const getVendorById = async(id: number) => {
    const prisma = new PrismaClient()
}