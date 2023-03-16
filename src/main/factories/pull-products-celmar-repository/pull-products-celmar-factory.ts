import { ErrorHandlerAdapter } from '../../../utils/error-handler-adapter';
import { PullProductsCelmarController } from './../../../presentation/controllers/pull-products-celmar/pull-products-celmar-controller';
import { Controller } from './../../../presentation/protocols/controller';
import { makeDbPullProductsCelmarRepository } from './db-pull-products-celmar-repository-factory'
export const makePullProductsCelmarController = (): Controller => { 
  return new PullProductsCelmarController(makeDbPullProductsCelmarRepository(), new ErrorHandlerAdapter())
}