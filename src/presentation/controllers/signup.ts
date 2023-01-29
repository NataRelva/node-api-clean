import { MissingParamError } from '../errors/missing-param.error'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignupController {
  handle (httpRequest: HttpRequest): any {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    } else if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
  }
}
