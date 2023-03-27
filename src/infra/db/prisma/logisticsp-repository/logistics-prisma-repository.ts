import { PrismaClient } from '@prisma/client';
import { LoadProductsByIdsRepository, DTOLoadProductByIdentifier, DTOResponseLoadProductByIdentifier } from './../../../../data/protocols/db/logistics/load-products-by-ids-repository';
export class LogisticsPrismaRepository implements LoadProductsByIdsRepository {
  constructor(
    private readonly prisma: PrismaClient
  ) {}

  async loadByIds(ids: DTOLoadProductByIdentifier[]): Promise<DTOResponseLoadProductByIdentifier> {
    const celmarIds = [];
    const rmouraIds = [];

    for (const {id, provider} of ids) {
        if (provider === 'celmar') {
            celmarIds.push(id);
        } else if (provider === 'rmoura') {
            rmouraIds.push(id);
        }
    }

    const response: DTOResponseLoadProductByIdentifier = { celmar: [], rmoura: [] };

    if (celmarIds.length > 0) {
      const where = { id: { in: celmarIds } }
      const include = { mainCategory: true, subCategory: true, package: true }
      const celmarProducts = await this.prisma.celmarProduct.findMany({ where, include });
      response.celmar = celmarProducts;
    }

    if (rmouraIds.length > 0) {
      const where = { id: { in: rmouraIds } }
      const include = { unit: true, category: true, package: true }
      const rmouraProducts = await this.prisma.rmouraProduct.findMany({ where, include }) as any;
      response.rmoura = rmouraProducts;
    }

    return response;
  }
}