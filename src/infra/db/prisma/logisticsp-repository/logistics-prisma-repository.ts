import { PrismaClient } from '@prisma/client';
import { ProductModel } from './../../../../domain/models/product/product';
import { LoadProductsByIdsRepository, DTOLoadProductByIdentifier, RequestedProductDetails } from './../../../../data/protocols/db/logistics/load-products-by-ids-repository';
export class LogisticsPrismaRepository implements LoadProductsByIdsRepository {
  constructor(
    private readonly prisma: PrismaClient
  ) {}

  async loadProductsByIds(ids: DTOLoadProductByIdentifier[]): Promise<RequestedProductDetails[]> {
    const requestedProductDetails: RequestedProductDetails[] = [];
    for( const { id , quantity, discount } of ids ) { 
      const product = await this.prisma.product.findUnique({ 
        where: { id },
        include: {
          category: true,
          package: true,
          mainCategory: true,
          subCategory: true,
          unit: true,
        }
      }) as any as ProductModel
      requestedProductDetails.push({ product, quantity, discount });
    }
    return requestedProductDetails;
  }
}