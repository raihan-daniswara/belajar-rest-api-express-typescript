import { afterAll, beforeAll, describe, it } from "bun:test";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import createServer from "../utils/server";
import { v7 as uuidV7 } from "uuid";
import { createUser } from "../services/auth.service";
import { hashPassword } from "../utils/hashing";

const app = createServer();

const userIdAdmin = uuidV7();
const userIdRegular = uuidV7();

const userRegularLogin = {
  email: "raihan.daniswara15@gmail.com",
  password: "123123",
};
const userAdminLogin = {
  email: "raihan.daniswara@gmail.com",
  password: "123123",
};
const userNotExist = {
  email: "raihan.daniswarasad@gmail.com",
  password: "1231231",
};

const createdUserRegular = {
  email: "raihan15@gmail.com",
  name: "Raihan Daniswara",
  password: "123123",
};

const createdUserAdmin = {
  email: "raihan@gmail.com",
  name: "Raihan Daniswara",
  password: "123123",
  role: "admin",
};

describe("auth", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    await createUser({
      user_id: userIdRegular,
      email: "raihan.daniswara15@gmail.com",
      name: "Raihan Daniswara",
      password: await hashPassword("123123"),
      role: "regular",
    });

    await createUser({
      user_id: userIdAdmin,
      email: "raihan.daniswara@gmail.com",
      name: "Raihan Daniswara",
      password: await hashPassword("123123"),
      role: "admin",
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("register", () => {
    describe("create user with role admin", () => {
      it("should return 201, success create user", async () => {
        await supertest(app)
          .post("/auth/register")
          .send(createdUserAdmin)
          .expect(201);
      });
    });
    describe("create user with role regular", () => {
      it("should return 201, success create user", async () => {
        await supertest(app)
          .post("/auth/register")
          .send(createdUserRegular)
          .expect(201);
      });
    });
  });

  describe("login", () => {
    describe("success login", () => {
      it("should return 200, return access token & refresh token", async () => {
        await supertest(app)
          .post("/auth/login")
          .send(userAdminLogin)
          .expect(200);

        await supertest(app)
          .post("/auth/login")
          .send(userRegularLogin)
          .expect(200);
      });
    });
    describe("login with not exist user", () => {
      it("should return 422,username or password invalid", async () => {
        await supertest(app).post("/auth/login").send(userNotExist).expect(422);
      });
    });
  });
});
