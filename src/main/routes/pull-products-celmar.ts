import { adaptRoute } from './../adapters/express-route-adpter';
import { Router } from 'express';
import { makePullProductsCelmarController } from '../factories/pull-products-celmar-repository/pull-products-celmar-factory';
export default function (router: Router) {
  router.post('/pull-products-celmar', adaptRoute(makePullProductsCelmarController()))
}