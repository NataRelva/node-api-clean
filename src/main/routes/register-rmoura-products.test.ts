import supertest from 'supertest'
import app from '../config/app'

const makeRequest = (): { products: any[] } => { 
  return {
    products: [
      {
        "code": 1234,
        "name": "Camisa Polo",
        "weight": 0.2,
        "obs": "Cor: Azul, Tamanho: M",
        "unit": "unidade",
        "price": 49.99,
        "package": "saco"
      },
      {
        "code": 5678,
        "name": "Calça Jeans",
        "weight": 0.8,
        "obs": "Cor: Preto, Tamanho: 42",
        "unit": "unidade",
        "price": 89.99,
        "package": "saco"
      },
      {
        "code": 9012,
        "name": "Tênis Adidas",
        "weight": 1.2,
        "obs": "Cor: Branco, Tamanho: 40",
        "unit": "par",
        "price": 249.99,
        "package": "caixa"
      },
      {
        "code": 3456,
        "name": "Bola de Futebol",
        "weight": 0.4,
        "obs": "Tamanho: 5",
        "unit": "unidade",
        "price": 59.99,
        "package": "saco"
      },
      {
        "code": 7890,
        "name": "Relógio de Pulso",
        "weight": 0.1,
        "obs": "Cor: Prata, Material: Aço Inoxidável",
        "unit": "unidade",
        "price": 199.99,
        "package": "caixa"
      },
      {
        "code": 2345,
        "name": "Fone de Ouvido Bluetooth",
        "weight": 0.05,
        "obs": "Cor: Preto, Conexão: Sem Fio",
        "unit": "unidade",
        "price": 79.99,
        "package": "saco"
      },
      {
        "code": 6789,
        "name": "Notebook Dell",
        "weight": 1.5,
        "obs": "Processador Intel Core i7, 16GB RAM, 1TB HD",
        "unit": "unidade",
        "price": 4499.99,
        "package": "caixa"
      },
      {
        "code": 1230,
        "name": "Mochila Escolar",
        "weight": 0.8,
        "obs": "Cor: Azul, Capacidade: 20 Litros",
        "unit": "unidade",
        "price": 129.99,
        "package": "saco"
      },
      {
        "code": 4567,
        "name": "Fogão a Gás",
        "weight": 30.0,
        "obs": "Quantidade de Bocas: 5",
        "unit": "unidade",
        "price": 1999.99,
        "package": "caixa"
      },
        {
        "code": 4567,
        "name": "Fogão a Gás",
        "weight": 30.0,
        "obs": "Quantidade de Bocas: 5",
        "unit": "unidade",
        "price": 1999.99,
        "package": "pacotão de 30"
      }
    ]
  }
}

const request = supertest(app)

describe('Register Rmoura Products Router', () => { 
  test('Should return 200 on register-products', async () => { 
    const response = await request
      .post('/api/register-products')
      .send(makeRequest())
    expect(response.status).toBe(200)
    expect(response.body).toEqual('registrados com sucesso')
  })

  test('Should return 400 on register-products', async () => { 
    const response = await request
      .post('/api/register-products')
      .send({})
    expect(response.status).toBe(400)
    expect(response.body).toEqual({"error": "Missing param: products"})
  })

})