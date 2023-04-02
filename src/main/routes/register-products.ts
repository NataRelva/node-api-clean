import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adpter";
import { makeRegisterProduct } from "../factories/create-rmoura-product/create-rmoura-product-refactory";
export default (router: Router): void => { 
  router.post("/register-products", adaptRoute(makeRegisterProduct()));
}