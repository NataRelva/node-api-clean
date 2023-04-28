import { ProviderMiddleware } from '../../presentation/middlewares/provider-middleware';
import { adaptMiddleware } from '../adapters/express-middleware-adpter';
import { makePullProductsController } from '../factories/load-products-rmoura/load-products-factory';
import { makeProviderMiddleware } from '../factories/middlewares/provider-middleware';
import { adaptRoute } from './../adapters/express-route-adpter';
import { Router } from 'express';

export default function (router: Router) {
  router.post('/pull-products-rmoura',adaptMiddleware(makeProviderMiddleware('rmoura')),adaptRoute(makePullProductsController()));
}