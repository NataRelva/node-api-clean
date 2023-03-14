import { RMouraPackage } from './../../../../domain/models/rmoura-product';

import { PrismaClient } from '@prisma/client';
import { RmouraProduct } from './../../../../domain/useCases/register-rmoura-product';
import { AddRmouraProductsRepository } from './../../../../data/protocols/db/product/add-rmoura-products.repository';
export class ProductPrismaRepository implements AddRmouraProductsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  private registerCategory = async (product: RmouraProduct): Promise<string> => { 
    return new Promise(async (resolve, reject) => { 
      let existingCategory = await this.prisma.rMouraCategory.findUnique({
        where: { name: product.package },
      });
      // Se a categoria não existir, crie uma nova
      if (!existingCategory) {
        existingCategory = await this.prisma.rMouraCategory.create({
          data: { name: product.package },
        });
      }
      resolve(existingCategory.id)
    })
  }

  private registerUnit = async (product: RmouraProduct): Promise<string> => { 
    return new Promise(async (resolve, reject) => { 
      let existingUnit = await this.prisma.rMouraUnit.findUnique({
        where: { name: product.unit },
      });
    
      // Se a categoria não existir, crie uma nova
      if (!existingUnit) {
        existingUnit = await this.prisma.rMouraUnit.create({
          data: { name: product.unit },
        });
      }
  
      resolve(existingUnit.id)
    })
  }

  private registerPackage = async (product: RmouraProduct): Promise<string> => { 
    return new Promise(async (resolve, reject) => { 
      let existingPackage = await this.prisma.rMouraPackage.findUnique({
        where: { name: product.package },
      });
    
      // Se a categoria não existir, crie uma nova
      if (!existingPackage) {
        existingPackage = await this.prisma.rMouraPackage.create({
          data: { name: product.package },
        });
      }
      resolve(existingPackage.id)
    })
  }

  async addRmoura(products: RmouraProduct[]): Promise<void> {
    await this.prisma.rMouraProduct.deleteMany({})
    for (const product of products) {
      const idUnit = await this.registerUnit(product)
      const idPackage = await this.registerPackage(product)
      const idCategory = await this.registerCategory(product)

      const productCreat = await this.prisma.rMouraProduct.create({ 
        data: {
          name: product.name,
          weight: product.weight,
          obs: product.obs,
          price: product.price,
        }
      })
      
      // Criar relacionamento entre produto e categoria (n:n)
      await this.prisma.rMouraCategoryProduct.create({ 
        data: { 
          productId: productCreat.id,
          categoryId: idCategory
        }
      })

      // Criar relacionamento entre produto e unidade (n:n)
      await this.prisma.rMouraUnitProduct.create({ 
        data: { 
          productId: productCreat.id,
          unitId: idUnit
        }
      })

      // Criar relacionamento entre produto e embalagem (n:n)
      await this.prisma.rMouraPackageProduct.create({ 
        data: { 
          productId: productCreat.id,
          packageId: idPackage
        }
      })
    }
  }
}