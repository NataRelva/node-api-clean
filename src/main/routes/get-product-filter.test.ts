import supertest from 'supertest';
import app from '../config/app';

const request = supertest(app).get('/api/get-product-filter');

const makeResponse = () => {
  return {
    "filterResponse": {
      "units": [
        {
          "id": "2efcad57-6fc7-4672-bcf8-18b8365869b6",
          "name": "unidade",
          "createdAt": "2023-03-13T19:26:14.453Z",
          "updatedAt": "2023-03-13T19:26:14.453Z"
        },
        {
          "id": "2c61499a-542e-44bf-a91b-aae3b15c75b8",
          "name": "par",
          "createdAt": "2023-03-13T19:26:14.544Z",
          "updatedAt": "2023-03-13T19:26:14.544Z"
        }
      ],
      "packages": [
        {
          "id": "bd937d2a-ca63-4bbb-b16a-a436079fe66f",
          "name": "saco",
          "createdAt": "2023-03-13T19:26:14.463Z",
          "updatedAt": "2023-03-13T19:26:14.463Z"
        },
        {
          "id": "b7c6ebb3-f79c-4317-9a03-c496a1476c6b",
          "name": "caixa",
          "createdAt": "2023-03-13T19:26:14.551Z",
          "updatedAt": "2023-03-13T19:26:14.551Z"
        }
      ],
      "categories": [
        {
          "id": "9367441f-bdc1-4c75-8d49-073b764f1a6b",
          "name": "saco",
          "createdAt": "2023-03-13T19:26:14.472Z",
          "updatedAt": "2023-03-13T19:26:14.472Z"
        },
        {
          "id": "31d2dd58-9c12-4618-bebd-9433f1f22168",
          "name": "caixa",
          "createdAt": "2023-03-13T19:26:14.559Z",
          "updatedAt": "2023-03-13T19:26:14.559Z"
        }
      ]
    }
  }
}

describe('GetProductFilter Router', () => {
  test('Should return 200 on success', async () => {
    await request.expect(200)
  })
})