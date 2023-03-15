import { AddCelmarProductsRepository } from './../../../../data/protocols/db/product/add-celmar-products.repository';
import { RequestCelmarProduct } from './../../../../domain/useCases/register-products-celmar';
import { PrismaClient } from '@prisma/client';

import { FilterRequest } from './../../../../domain/models/product-configuration';
import { PullProductsRmouraRepository } from './../../../../data/protocols/db/product/pull-products-products-repository';
import { GetProductFilterRepository } from './../../../../data/protocols/db/product/get-products-filter.repository';
import { RmouraProductModel } from './../../../../domain/models/rmoura-product';
import { RmouraProduct } from './../../../../domain/useCases/register-rmoura-product';
import { AddRmouraProductsRepository } from './../../../../data/protocols/db/product/add-rmoura-products.repository';

export class ProductPrismaRepository implements AddRmouraProductsRepository, GetProductFilterRepository, PullProductsRmouraRepository, AddCelmarProductsRepository {
  constructor(private readonly prisma: PrismaClient) { }

  // ------------------ GetProductFilterRepository ------------------
  async get(): Promise<any> {
    const units = await this.prisma.rmouraUnit.findMany()
    const packages = await this.prisma.rmouraPackage.findMany()
    const categories = await this.prisma.rmouraCategory.findMany()
    return { units, packages, categories }
  }

  // ------------------ AddRmouraProductsRepository ------------------

  async pullRmoura(props: FilterRequest): Promise<RmouraProductModel[]> {
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
      ...(categoryId && { category: { some: { id: categoryId } } }),
      ...(unitId && { unit: { some: { id: unitId } } }),
      ...(packageId && { package: { some: { id: packageId } } }),
    };

    const products = await this.prisma.rmouraProduct.findMany({
      where,
      include: {
        unit: true,
        category: true,
        package: true,
      },
      take: limit,
      skip: page !== 0 ? (page - 1) * limit : 0,
    });

    return products as any
  }

  async addRmoura(products: RmouraProduct[]): Promise<void> {
    await this.prisma.rmouraProduct.deleteMany({});
    for (const product of products) {
      await this.prisma.rmouraProduct.create({
        data: {
          name: product.name,
          weight: product.weight,
          obs: product.obs,
          price: product.price,
          unit: { connectOrCreate: { create: { name: product.unit}, where: { name: product.unit } } },
          category: { connectOrCreate: { create: { name: product.package }, where: { name: product.package } } },
          package: { connectOrCreate: { create: { name: product.package }, where: { name: product.package } } },
        },
      });
    }
  }

  // ------------------ AddCelmarProductsRepository ------------------

  async addCelmar(products: RequestCelmarProduct[]): Promise<void> { 
    await this.prisma.celmarProduct.deleteMany({});
    for (const product of products) {
      await this.prisma.celmarProduct.create({
        data: {
          code: product.code,
          name: product.name,
          price: product.price,
          package: { connectOrCreate: { create: { name: product.package }, where: { name: product.package } } },
          mainCategory: { connectOrCreate: { create: { name: product.category_main }, where: { name: product.category_main } } },
          subCategory: { connectOrCreate: { create: { name: product.category_sub },  where: { name: product.category_sub } } },
        },
      });
    }
  }
}