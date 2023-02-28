import { PrismaHelper } from './prisma-helper'

describe('Prisma Helper', () => {
    beforeAll(async () => {
        await PrismaHelper.connect()
    })

    afterAll(async () => {
        await PrismaHelper.disconnect();
    });

    test('Should return a prisma client', async () => {
        const client = PrismaHelper.getPrisma()
        expect(client).toBeTruthy()
    })
})