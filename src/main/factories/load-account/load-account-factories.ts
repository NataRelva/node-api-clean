import { LoadAccountController } from "../../../presentation/controllers/load-account/load-account-controller";
import { Controller } from "../../../presentation/protocols";
import { makeDbLoadAccountByToken } from '../useCases/load-account-by-token/db-load-account-ny-token-factory';

export const makeLoadAccountController = (): Controller => {
  const dbLoadAccount = makeDbLoadAccountByToken()
  return new LoadAccountController(dbLoadAccount)
} 