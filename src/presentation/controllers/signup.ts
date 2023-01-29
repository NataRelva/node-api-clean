import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignupController {
  handle (httpRequest: HttpRequest): any {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    } else if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }
  }
}
