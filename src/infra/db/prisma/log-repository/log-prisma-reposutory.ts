import { PrismaHelper } from './../helpers/prisma-helper';
import { LogErrorRepository } from './../../../../data/protocols/db/log/log-error-repository';
export class LogPrismaRepository implements LogErrorRepository {
    async logError(stack: string): Promise<void> {
        const prisma = PrismaHelper.getPrisma();
        await prisma.log.create({ data: { stack } })
    }
}