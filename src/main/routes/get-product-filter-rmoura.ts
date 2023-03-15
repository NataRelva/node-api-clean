import { makeBringAllFilterOptionsCelmar } from './../factories/bring-all-filter-options-celmar/bring-all-filter-options-celmar-factory';
import { adaptRoute } from './../adapters/express-route-adpter';
import { Router } from 'express';
export default function (router: Router): void { 
  router.get('/get-product-filter-celmar', adaptRoute(makeBringAllFilterOptionsCelmar()));
}