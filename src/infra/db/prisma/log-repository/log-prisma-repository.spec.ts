import { LogPrismaRepository } from './log-prisma-reposutory';
import { PrismaHelper } from '../helpers/prisma-helper';
describe('Log Prisma Repository', () => {

    const prisma = PrismaHelper.getPrisma()

    beforeAll(async () => {
        await PrismaHelper.connect()
    })

    afterAll(async () => {
        await PrismaHelper.disconnect()
    })

    beforeEach(async () => {
        await prisma.log.deleteMany({})
    })

    test('Should log error stack to database', async () => {
        const stack = 'Error stack trace';
        const logPrismaRepository = new LogPrismaRepository();
        await logPrismaRepository.logError(stack);
        const logs = await prisma.log.findMany();
        expect(logs).toHaveLength(1);
        expect(logs[0].stack).toBe(stack);
    });
})