import { ErrorHandlerAdapter } from './../../../utils/error-handler-adapter';
import { ErrorHandler } from './../../protocols/error-handler';
import { RequestCelmarProduct, RegisterProductsCelmar } from './../../../domain/useCases/register-products-celmar';
import { RegisterProductsCelmarController } from './register-products-celmar-controller';
const makeSut = () => {
  class RegisterProductsCelmarStub implements RegisterProductsCelmar { 
    async register(products: RequestCelmarProduct[]): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }
  const registerProductsCelmarStub = new RegisterProductsCelmarStub();
  const errorHandler = new ErrorHandlerAdapter();
  const sut = new RegisterProductsCelmarController(errorHandler,registerProductsCelmarStub);
  return { sut, registerProductsCelmarStub };
}

const mockRequest = (): {body: {products: RequestCelmarProduct[]}} => ({ 
  body: { 
    products: [ 
      {
        code: '123',
        name: 'any_name',
        price: 10,
        package: 'any_package',
        category_main: 'any_category_main',
        category_sub: 'any_category_sub'
      },
      {
        code: '123',
        name: 'any_name',
        price: 10,
        package: 'any_package',
        category_main: 'any_category_main',
        category_sub: 'any_category_sub'
      },
      {
        code: '123',
        name: 'any_name',
        price: 10,
        package: 'any_package',
        category_main: 'any_category_main',
        category_sub: 'any_category_sub'
      },
    ]
  }
})
describe('RegisterProductsCelmarController', () => { 
  it('should return 200 if products are registered successfully', async () => { 
    const { sut } = makeSut();
    const request = mockRequest();
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(200);
  })
  
  it('should return 400 if RegisterProductsCelmar throws', async () => { 
    const { sut, registerProductsCelmarStub } = makeSut();
    jest.spyOn(registerProductsCelmarStub,'register').mockImplementationOnce(async () => { 
      return new Promise((resolve,reject) => reject(new Error()));
    })
    const request = mockRequest();
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(400);
  })
})