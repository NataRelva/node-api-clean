import { HttpRequest, HttpResponse } from "../protocols";
import { Middleware } from "./auth-middleware-protocols";

export class ProviderMiddleware implements Middleware {
  constructor(
    private providerId: string
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: {
        ...httpRequest.body,
        providerId: this.providerId
      }
    }
  }
}