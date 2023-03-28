import { LoadProductsByIdsRepository } from './../../../protocols/db/logistics/load-products-by-ids-repository';
import { ProductCheckInData, ProductCheckInStatus } from './../../../../domain/models/logistics/product-check-in-data';
import { ShoppingCart } from './../../../../presentation/protocols/shopping-cart';
import { ProductCheckIn } from './../../../../domain/useCases/logistics/productCheckIn/product-checkIn-usecase';

export class DbProductCheckInRepository implements ProductCheckIn {

  constructor(private readonly loadProductsByIdsRepository: LoadProductsByIdsRepository) {}

  async checkIn(data: ShoppingCart): Promise<ProductCheckInData[]> {
    const { products } = data;
    const chosenProductIdentifiers = products.map(product => ({
      id: product.productId,
      quantity: product.quantity,
      discount: product.discount,
    }));
    const databaseSourceProducts = await this.loadProductsByIdsRepository.loadProductsByIds(chosenProductIdentifiers);
    const productCheckInData: ProductCheckInData[] = [];
    for( const { product, quantity } of databaseSourceProducts ) {
      const status: ProductCheckInStatus = {
        availabilityCheck: true,
        conditionCheck: true,
        expirationDateCheck: true,
        serialNumberCheck: true,
        priceCheck: true,
        documentationCheck: true,
        storageCheck: true,
        identificationCheck: true,
      }
      const productCheckInDataItem: ProductCheckInData = { 
        product,
        quantity,
        status
      };
      productCheckInData.push(productCheckInDataItem);
    }
    return productCheckInData;
  }
}