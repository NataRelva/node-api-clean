import { DbUpdateEmailRepository } from "../../../../data/usecases/account/update/update-email.repository";
import { DbUpdatePersonalInformation } from "../../../../data/usecases/account/update/update-personal-information.respository";
import { DbChangeAccountPassword } from "../../../../data/usecases/chage-account-password/db-change-account-password";
import { BcryptAdapter } from "../../../../infra/criptography/bcrypt-adpter/bcrypt-adapter";
import { AccountPrismaRepository } from "../../../../infra/db/prisma/account-repository/account-prisma.repository";
import { UpdatePersonalInformationController, UpdatePersonalLoginController } from "../../../../presentation/controllers/account/update/update-personal-information.controller";
import { Controller } from "../../../../presentation/protocols";
import env from "../../../config/env";

export function makeUpdatePersonalInformationController ( ): Controller {
  const dbUseCase = new DbUpdatePersonalInformation(new AccountPrismaRepository())
  return new UpdatePersonalInformationController(dbUseCase)
}

export function makeUpdatePersonalLoginController ( ): Controller {
  const dbUseCase = new DbUpdateEmailRepository(new AccountPrismaRepository())
  const changeAccountPasswordRepository = new AccountPrismaRepository()
  const loadAccountByTokenRepository = new AccountPrismaRepository()
  const bcryptAdapter = new BcryptAdapter(env.salt)
  const changeAccountPassword = new DbChangeAccountPassword(changeAccountPasswordRepository,loadAccountByTokenRepository, bcryptAdapter)
  return new UpdatePersonalLoginController(changeAccountPassword, dbUseCase)
}