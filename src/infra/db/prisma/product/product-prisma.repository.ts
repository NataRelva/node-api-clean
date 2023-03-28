import { Package } from './../../../../domain/models/product/product';
import { MainCategory, PrismaClient, SubCategory } from '@prisma/client';
import { FilterRequest, ProductModel } from './../../../../domain/models/product';
import { Product } from './../../../../domain/useCases/product';
import { GetProductFilterRepository } from './../../../../data/protocols/db/product/get-products-filter.repository';
import { AddProductsRepository } from './../../../../data/protocols/db/product';

export class ProductPrismaRepository implements
  AddProductsRepository,
  GetProductFilterRepository {

  constructor(private readonly prisma: PrismaClient) { }

  async getRmoura(): Promise<any> {
    const where = { product: { some: { provider: 'rmoura' } } }
    const units = await this.prisma.unit.findMany({ where })
    const packages = await this.prisma.package.findMany({ where })
    const categories = await this.prisma.category.findMany({ where })
    return { units, packages, categories }
  }

  async getCelmar(): Promise<any> {
    const where = { product: { some: { provider: 'celmar' } } }
    const mainCategory = await this.prisma.mainCategory.findMany({where})
    const subCategory = await this.prisma.subCategory.findMany({where})
    const packages = await this.prisma.package.findMany({where})
    return { mainCategory, subCategory, packages }
  }

  async addProducts(products: Product[]): Promise<void> {
    const rmouraProducts = products.filter(product => product.provider === 'rmoura')
    const celmarProducts = products.filter(product => product.provider === 'celmar')

    if (rmouraProducts.length > 0) {
      await this.prisma.product.deleteMany({
        where: { provider: 'rmoura'}
      });
      for (const product of rmouraProducts) {
        await this.prisma.product.create({
          data: {
            name: product.name,
            weight: product.weight,
            obs: product.obs,
            price: product.price,
            provider: product.provider,
            unit: { connectOrCreate: { create: { name: product.unit}, where: { name: product.unit } } },
            category: { connectOrCreate: { create: { name: product.package }, where: { name: product.package } } },
            package: { connectOrCreate: { create: { name: product.package }, where: { name: product.package } } },
          },
        });
      }
    }
    
    if (celmarProducts.length > 0) {
      await this.prisma.product.deleteMany({
        where: { provider: 'celmar'}
      });
      for (const product of celmarProducts) {
        await this.prisma.product.create({
          data: {
            name: product.name,
            price: product.price,
            obs: '',
            weight: 0,
            provider: product.provider,
            package: { connectOrCreate: { create: { name: product.package }, where: { name: product.package } } },
            mainCategory: { connectOrCreate: { create: { name: product.category_main }, where: { name: product.category_main } } },
            subCategory: { connectOrCreate: { create: { name: product.category_sub },  where: { name: product.category_sub } } },
          },
        });
      }
    }

  }
  
  async pullRmoura(props: FilterRequest): Promise<ProductModel[]> {
    const { filter, paginator, text } = props;
    const { page, limit } = paginator;
    const { categoryId, unitId, packageId, price } = filter;
    const { min = 0, max = Number.MAX_SAFE_INTEGER } = price;
    const where = {
      name: {
        contains: text,
      },
      price: {
        gte: min,
        lte: max,
      },
      provider: 'rmoura',
      ...(categoryId && { category: { some: { id: categoryId } } }),
      ...(unitId && { unit: { some: { id: unitId } } }),
      ...(packageId && { package: { some: { id: packageId } } }),
    };
    const products = await this.prisma.product.findMany({
      where,
      include: {
        unit: true,
        category: true,
        package: true,
      },
      take: limit,
      skip: page !== 0 ? (page - 1) * limit : 0,
    }) as any as ProductModel[]
    return products;
  }

  async pullCelmar(props: FilterRequest): Promise<ProductModel[]> {
    const { filter, paginator, text } = props;
    const { page, limit } = paginator;
    const { mainCategoryId, subCategoryId, packageId, price } = filter;
    const { min = 0, max = Number.MAX_SAFE_INTEGER } = price;
    const where = {
      name: {
        contains: text,
      },
      price: {
        gte: min,
        lte: max,
      },
      provider: 'celmar',
      ...(mainCategoryId && { mainCategory: { some: { id: mainCategoryId } } }),
      ...(subCategoryId && { subCategory: { some: { id: subCategoryId } } }),
      ...(packageId && { package: { some: { id: packageId } } }),
    }
    const product = await this.prisma.product.findMany({
      where ,
      include: {
        mainCategory: true,
        subCategory: true,
        package: true
      },
      take: limit, skip: page !== 0 ? (page - 1) * limit : 0
    }) as any as ProductModel[]
    return product
  }
}