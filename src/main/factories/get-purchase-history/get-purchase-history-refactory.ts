import { PrismaClient } from "@prisma/client";
import { DbPurchaseHistory } from "../../../data/usecases/purchase-history/db-purchase-history.usecase";
import { FinancialRepository } from "../../../infra/db/prisma/financial-repository/financial-repository";
import { GetPurchaseHistoryController } from "../../../presentation/controllers/purchase/purchase-history/get-purchase-history.controller";
import { Controller } from "../../../presentation/protocols";

function makeGetPurchaseHistoryUseCase () {
  return new DbPurchaseHistory(new FinancialRepository(new PrismaClient()))
}

export const makeGetPurchaseHistoryController = (): Controller => {
  return new GetPurchaseHistoryController(makeGetPurchaseHistoryUseCase())
}