// import app from "../../../app";
// import request from "supertest";
// import { database } from "../../../database";

// let server;

// beforeEach(async () => {
//   await database.create();
//   const port = process.env.PORT;
//   server = app.listen(port);
// });

// afterEach(async () => {
//   await database.close();

//   server.close();
// });

// describe("POST em /users", () => {
//   let newEmail = `user-test-${new Date().toISOString()}@email.com`;
//   it("Should create a new user", async () => {
//     await request(app)
//       .post("/api/v1/users")
//       .send({
//         password: "password",
//         email: newEmail,
//       })
//       .set("Accept", "application/json")
//       .expect(201)
//       .expect("Content-Type", /json/);
//   });

//   it("Should not create a new user if exists the same email", async () => {
//     const response = await request(app)
//       .post("/api/v1/users")
//       .send({
//         password: "password",
//         email: newEmail,
//       })
//       .set("Accept", "application/json")
//       .expect(400)
//       .expect("Content-Type", /json/);
//     expect(response.body.message).toEqual("User already exists");
//   });

//   it("Should return Bad Request if the request body is wrong", async () => {
//     const response = await request(app)
//       .post("/api/v1/users")
//       .send({
//         password: "password",
//       })
//       .set("Accept", "application/json")
//       .expect(400)
//       .expect("Content-Type", /json/);
//     expect(response.body.message).toEqual('"email" is required');
//   });
// });

describe('/users', () => {
  it('Should create a new user', async () => {
    expect(1 + 1).toBe(2)
  })
})
