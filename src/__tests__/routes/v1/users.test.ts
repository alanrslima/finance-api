import app from "../../../app";
import request from "supertest";
import { database } from "../../../database";

let server;

beforeEach(async () => {
  await database.create();
  const port = process.env.PORT;
  server = app.listen(port);
});

afterEach(async () => {
  await database.close();

  server.close();
});

describe("POST em /users", () => {
  let newUsername = `user-test-${new Date().toISOString()}`;
  it("Should create a new user", async () => {
    await request(app)
      .post("/api/v1/users")
      .send({
        password: "password",
        username: newUsername,
      })
      .set("Accept", "application/json")
      .expect(201)
      .expect("Content-Type", /json/);
  });

  it("Should not create a new user if exists the same username", async () => {
    const response = await request(app)
      .post("/api/v1/users")
      .send({
        password: "password",
        username: newUsername,
      })
      .set("Accept", "application/json")
      .expect(400)
      .expect("Content-Type", /json/);
    expect(response.body.message).toEqual("User already exists");
  });

  it("Should return Bad Request if the request body is wrong", async () => {
    const response = await request(app)
      .post("/api/v1/users")
      .send({
        password: "password",
      })
      .set("Accept", "application/json")
      .expect(400)
      .expect("Content-Type", /json/);
    expect(response.body.message).toEqual('"username" is required');
  });
});
