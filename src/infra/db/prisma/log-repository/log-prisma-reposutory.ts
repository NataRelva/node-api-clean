import { LogErrorRepository } from './../../../../data/protocols/db/log/log-error-repository';
import { PrismaClient } from '@prisma/client';
export class LogPrismaRepository implements LogErrorRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async logError(stack: string): Promise<void> {
        await this.prisma.log.create({ data: { stack } })
    }
}