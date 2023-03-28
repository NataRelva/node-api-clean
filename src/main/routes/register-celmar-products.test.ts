// import { RegisterProductsCelmarController } from './../../presentation/controllers/register-celmar-products/register-products-celmar-controller';
// import supertest from 'supertest'
// import app from '../config/app'

// const makeRequest = (): { products: any[] } => { 
//   return {
//     products:  [
//       {
//         code: "123",
//         name: "any_name",
//         price: 10,
//         package: "any_package",
//         category_main: "any_category_main",
//         category_sub: "any_category_sub",
//       },
//       {
//         code: "123",
//         name: "any_name",
//         price: 10,
//         package: "any_package",
//         category_main: "any_category_main",
//         category_sub: "any_category_sub",
//       },
//       {
//         code: "123",
//         name: "any_name",
//         price: 10,
//         package: "any_package",
//         category_main: "any_category_main",
//         category_sub: "any_category_sub",
//       },
//     ]
//   }
// }

// const request = supertest(app);
// describe("RegisterProductsCelmarRouter", () => {
//   it("should return 200 if products are registered successfully", async () => {
//     const response = await request.post("/api/register-products").send(makeRequest())
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({ message: "Products registered successfully" });
//   })
//   it("should return 400 if products are not provided", async () => { 
//     const response = await request.post("/api/register-products").send({})
//     expect(response.status).toBe(400);
//     expect(response.body).toEqual({ error: "Products are required" });
//   })
// })

describe("RegisterProductsCelmarRouter", () => { 
  test("should return 200 if products are registered successfully", async () => { })
})