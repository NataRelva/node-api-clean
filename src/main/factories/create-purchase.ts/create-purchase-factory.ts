import { EmailService } from './../../../services/useCases/emails/email-service';
import { DbCreatePurchaseOrderRepository } from "../../../data/usecases/create-purchase-order-repository/db-create-purchase-order-repository";
import { DbCreatePurchase } from "../../../data/usecases/financial/create-purchase/db-create-purchase";
import { StartPurchaseProcess } from "../../../presentation/controllers/create-purchase-order/create-purchase-order-controller";
import { CreatePurchase } from "../../../presentation/controllers/create-purchase-order/protocols";
import { Controller } from "../../../presentation/protocols";
import { SendEmailAdpter } from '../../../services/useCases/send-email.adapter';
import { SendPurchaseConfirmationEmail } from '../../../services/protocols';
import { CreatePurchaseRepository } from '../../../data/protocols/db/financial/create-purchase-repository/create-purchase-repository';
import { FinancialRepository } from '../../../infra/db/prisma/financial-repository/financial-repository';
import { PrismaClient } from '@prisma/client';

const makeCreatePurchaseRepository = (): CreatePurchaseRepository => {
  return new FinancialRepository(new PrismaClient());
}

const makeSendPurchaseConfirmationEmail = (): SendPurchaseConfirmationEmail => { 
  return new EmailService();
}

const makeCreatePurchase = (): CreatePurchase => {
  const createPurchaseRepository = makeCreatePurchaseRepository();
  const sendPurchaseConfirmationEmail = makeSendPurchaseConfirmationEmail();
  return new DbCreatePurchase(createPurchaseRepository, sendPurchaseConfirmationEmail);
}

export const makeCreatePurchaseController = (): Controller => {
  const createPurchase = makeCreatePurchase();
  return new StartPurchaseProcess(createPurchase);
}