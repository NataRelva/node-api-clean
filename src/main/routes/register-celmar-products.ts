import { makeCreateCelmarProduct } from './../factories/create-celmar-product/create-celmar-product-refactory';
import { makeCreateRmouraProduct } from './../factories/create-rmoura-product/create-rmoura-product-refactory';
import { adaptRoute } from './../adapters/express-route-adpter';
import { Router } from 'express';
export default function (router: Router): void {
  router.post('/register-celmar-products',adaptRoute(makeCreateCelmarProduct()))
}