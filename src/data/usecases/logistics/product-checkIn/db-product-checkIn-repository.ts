import { LoadProductsByIdsRepository } from './../../../protocols/db/logistics/load-products-by-ids-repository';
import { RmouraProductModel } from './../../../../domain/models/product/rmoura-product';
import { ProductCheckInData } from './../../../../domain/models/logistics/product-check-in-data';
import { ShoppingCart } from './../../../../presentation/protocols/shopping-cart';
import { ProductCheckIn } from './../../../../domain/useCases/logistics/productCheckIn/product-checkIn-usecase';
import { CelmarProductModel } from '../../../../domain/models/product';

export class DbProductCheckInRepository implements ProductCheckIn {

  constructor(private readonly loadProductsByIdsRepository: LoadProductsByIdsRepository) {}

  async checkIn(data: ShoppingCart): Promise<ProductCheckInData[]> {
    const { products } = data;
    if (!products || Object.values(products).length == 0) {
      throw new Error('Missing param: products');
    }

    const chosenProductIdentifiers = products.map(product => ({
      id: product.productId,
      quantity: product.quantity,
      provider: product.provider
    }));

    const databaseSourceProducts = await this.loadProductsByIdsRepository.loadByIds(chosenProductIdentifiers);
    if (!databaseSourceProducts.celmar && !databaseSourceProducts.rmoura) {
      throw new Error('Products not found');
    }

    const productCheckInData: ProductCheckInData[] = [];
    const addProductCheckIn = (provider: 'celmar' | 'rmoura', products: Array<CelmarProductModel | RmouraProductModel>) => {
      products.forEach(product => {
        const productIdentifier = chosenProductIdentifiers.find(identifier => identifier.id === product.id);
        const productCheckIn: ProductCheckInData = {
          productId: product.id,
          quantity: productIdentifier.quantity,
          provider: provider,
          status: {
            availabilityCheck: true,
            conditionCheck: true,
            expirationDateCheck: true,
            serialNumberCheck: true,
            priceCheck: true,
            documentationCheck: true,
            storageCheck: true,
            identificationCheck: true,
          }
        }
        productCheckInData.push(productCheckIn);
      });
    };

    if (databaseSourceProducts.celmar?.length) {
      addProductCheckIn('celmar', databaseSourceProducts.celmar);
    }
    if (databaseSourceProducts.rmoura?.length) {
      addProductCheckIn('rmoura', databaseSourceProducts.rmoura);
    }

    return productCheckInData;
  }
}