import { Router } from 'express';
import { adaptRoute } from './../adapters/express-route-adpter';
import { makePullProductsController } from '../factories/load-products-rmoura/load-products-factory';
import { adaptMiddleware } from '../adapters/express-middleware-adpter';
import { makeProviderMiddleware } from '../factories/middlewares/provider-middleware';

export default function (router: Router) {
  router.post('/pull-products-celmar', adaptMiddleware(makeProviderMiddleware('celmar')),adaptRoute(makePullProductsController()))
}