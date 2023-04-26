import { DbUpdateEmailRepository } from '../../../data/usecases/account/update/update-email.repository';
import { DbUpgrateOrCreateAddress } from '../../../data/usecases/db-upgrate-or-create-address/db-upgrate-or-create-address';
import { AccountPrismaRepository } from '../../../infra/db/prisma/account-repository/account-prisma.repository';
import { UpgradeOrCreateAddressController } from '../../../presentation/controllers/account/address/upgrade-or-create-address.controller';
import { Controller } from '../../../presentation/protocols';
export function makeUpgradeOrCreateAddressFactory (): Controller {
  const updateOrCreateAddressRepository = new DbUpgrateOrCreateAddress(new AccountPrismaRepository())
  const upgradeOrCreateAddress = new UpgradeOrCreateAddressController(updateOrCreateAddressRepository)
  return upgradeOrCreateAddress
}