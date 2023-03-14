import { makePullProductsRmouraController } from './../factories/pull-products-rmoura/pull-products-rmoura-factory';
import { adaptRoute } from './../adapters/express-route-adpter';
import { Router } from 'express';
export default function (router: Router) {
  router.get('/pull-products-rmoura',adaptRoute(makePullProductsRmouraController()));
}