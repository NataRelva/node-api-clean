import { LoadProductsByIdsRepository, DTOLoadProductByIdentifier, DTOResponseLoadProductByIdentifier } from './../../../../data/protocols/db/logistics/load-products-by-ids-repository';
import { CelmarProductModel } from './../../../../domain/models/product/celmar-product';
import { PullProductsCelmarRepository } from './../../../../data/protocols/db/product/pull-products-products-celmar-repository';
import { AddCelmarProductsRepository } from './../../../../data/protocols/db/product/add-celmar-products.repository';
import { RequestCelmarProduct } from './../../../../domain/useCases/product/register-products-celmar';
import { PrismaClient } from '@prisma/client';

import { FilterRequest } from './../../../../domain/models/product/product-configuration';
import { PullProductsRmouraRepository } from './../../../../data/protocols/db/product/pull-products-products-repository';
import { GetProductFilterRepository } from './../../../../data/protocols/db/product/get-products-filter.repository';
import { RmouraProductModel } from './../../../../domain/models/product/rmoura-product';
import { RmouraProduct } from './../../../../domain/useCases/product/register-rmoura-product';
import { AddRmouraProductsRepository } from './../../../../data/protocols/db/product/add-rmoura-products.repository';

export class ProductPrismaRepository implements 
  AddRmouraProductsRepository, 
  GetProductFilterRepository,
  PullProductsRmouraRepository,
  AddCelmarProductsRepository,
  PullProductsCelmarRepository {

  constructor(private readonly prisma: PrismaClient) { }
  // ------------------ GetProductFilterRepository ------------------
  async getRmoura(): Promise<any> {
    const units = await this.prisma.rmouraUnit.findMany()
    const packages = await this.prisma.rmouraPackage.findMany()
    const categories = await this.prisma.rmouraCategory.findMany()
    return { units, packages, categories }
  }

  async getCelmar(): Promise<any> { 
    const mainCategory = await this.prisma.celmarMainCategory.findMany()
    const subCategory = await this.prisma.celmarSubCategory.findMany()
    const packages = await this.prisma.celmarPackage.findMany()
    return { mainCategory, subCategory, packages }
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

  async pullCelmar(props: FilterRequest): Promise<CelmarProductModel[]> {
    const { celmarFilter, paginator, text } = props;
    const { page, limit } = paginator;
    const { mainCategoryId, subCategoryId, packageId, price } = celmarFilter;
    const { min = 0, max = Number.MAX_SAFE_INTEGER } = price;
    const where = { 
      name: { 
        contains: text,
      },
      price: { 
        gte: min,
        lte: max,
      },
      ...(mainCategoryId && { mainCategory: { some: { id: mainCategoryId } } }),
      ...(subCategoryId && { subCategory: { some: { id: subCategoryId } } }),
      ...(packageId && { package: { some: { id: packageId } } }),
    }
    return await this.prisma.celmarProduct.findMany({ 
      where , 
      include: { 
        mainCategory: true, 
        subCategory: true, 
        package: true 
      }, 
      take: limit, skip: page !== 0 ? (page - 1) * limit : 0 
    })
  }
}