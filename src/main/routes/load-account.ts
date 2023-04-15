import { makeBringAllFilterOptionsRmoura } from '../factories/bring-all-filter-options-rmoura/bring-all-filter-options-rmoura-factory';
import { makeLoadAccountController } from '../factories/load-account/load-account-factories';
import { adaptRoute } from './../adapters/express-route-adpter';
import { Router } from 'express';
export default function (router: Router): void { 
  router.get('/load-account', adaptRoute(makeLoadAccountController()));
}