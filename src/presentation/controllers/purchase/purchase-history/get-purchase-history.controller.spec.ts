import { GetPurchaseHistory, PurchaseHistory } from "../../../../domain/useCases/financial/purchase/get-purchase-history.usecase";
import { GetPurchaseHistoryController } from "./get-purchase-history.controller";

function makeGetPurchaseHistory () { 
  class GetPurchaseHistoryStub implements GetPurchaseHistory { 
    async execute(accountId: string): Promise<PurchaseHistory[]> { 
      return new Promise(resolve => resolve([{
        id: 1,
        date: new Date(),
        products: [{
          id: 1,
          name: 'any_name',
          price: 1,
          quantity: 1
        }],
        totalAmount: 1,
        shippingAddress: {
          street: 'any_street',
          number: 1,
          city: 'any_city',
          state: 'any_state',
          country: 'any_country',
          zipCode: 'any_zipCode'
        }
      }]));
    }
  }
  return new GetPurchaseHistoryStub();
}

function makeSut() {
  const getPurchaseHistory = makeGetPurchaseHistory();
  const sut = new GetPurchaseHistoryController(getPurchaseHistory);
  return { 
    sut,
    getPurchaseHistory
  }
}

describe("Controller: GetPurchaseHistoryController", () => { 
  test("Should return 400 if no accountId is provided", () => { 
    const { sut } = makeSut();
    const httpRequest = { 
      body: { }
    };
    const httpResponse = sut.handle(httpRequest);
  });
  test("Should return 200 if valid accountId is provided", async () => { 
    const { sut } = makeSut();
    const httpRequest = { 
      body: { 
        accountId: 'valid_id'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body.purchases).toBeTruthy();
  });
  test("Should return 500 if GetPurchaseHistory throws", async () => { 
    const { sut, getPurchaseHistory } = makeSut();
    jest.spyOn(getPurchaseHistory, 'execute').mockImplementationOnce(() => { 
      throw new Error();
    });
    const httpRequest = { 
      body: { 
        accountId: 'valid_id'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new Error());
  });
});