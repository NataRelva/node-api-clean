import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient()

export const PrismaHelper = {
    connect: async (): Promise<void> => {
        await prisma.$connect()
    },
    disconnect: async (): Promise<void> => {
        await prisma.$disconnect()
    },
    getPrisma: (): PrismaClient => {
        return prisma
    }
}