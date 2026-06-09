import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import createServer from "../utils/server";
import { v7 as uuidV7 } from "uuid";
import type { ProductType } from "../types/product.type";
import { addProductToDB } from "../services/product.service";
import { createUser } from "../services/auth.service";
import { hashPassword } from "../utils/hashing";

const app = createServer();

const productId1 = uuidV7();
const productId2 = uuidV7();
const userIdAdmin = uuidV7();
const userIdRegular = uuidV7();

const productPayload: ProductType = {
  product_id: productId1,
  name: "Kaos Myla Place",
  price: 100000,
  size: "XL",
};

const createProductPayload: ProductType = {
  product_id: productId2,
  name: "Hoodie Ready or Not",
  price: 150000,
  size: "M",
};

const updateProductPayload = {
  price: 200000,
  size: "XXL",
};

const userRegular = {
  email: "raihan.daniswara15@gmail.com",
  password: "123123",
};
const userAdmin = {
  email: "raihan.daniswara@gmail.com",
  password: "123123",
};

describe("product", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    await addProductToDB(productPayload);

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

  describe("get all product", () => {
    describe("given the product does exist", () => {
      it("should return success 200, and detail product data", async () => {
        const { statusCode } = await supertest(app).get(`/products`);
        expect(statusCode).toBe(200);
      });
    });
  });

  describe("get detail product", () => {
    describe("given the product doesn't exist", () => {
      it("should return error 404", async () => {
        const productId = "incorrect";
        await supertest(app).get(`/products/${productId}`).expect(404);
      });
    });
    describe("given the product does exist", () => {
      it("should return success 200, and detail product data", async () => {
        const { statusCode } = await supertest(app).get(
          `/products/${productPayload.product_id}`,
        );
        expect(statusCode).toBe(200);
      });
    });
  });

  describe("create product", () => {
    describe("if user is not login", () => {
      it("should return 403, request forbidden", async () => {
        const { statusCode } = await supertest(app)
          .post("/products")
          .send(createProductPayload);

        expect(statusCode).toBe(403);
      });
    });
    describe("if user is login", () => {
      it("should return 201, success create product", async () => {
        const { body } = await supertest(app)
          .post("/auth/login")
          .send(userAdmin);

        const { statusCode } = await supertest(app)
          .post("/products")
          .set("Authorization", `${body.data.accessToken}`)
          .send(createProductPayload);
        expect(statusCode).toBe(201);
      });
      it("should return 422, product name already exist in db", async () => {
        const { body } = await supertest(app)
          .post("/auth/login")
          .send(userAdmin);
        const { statusCode } = await supertest(app)
          .post("/products")
          .set("Authorization", body.data.accessToken)
          .send(createProductPayload);
        expect(statusCode).toBe(422);
      });
    });
  });

  describe("update product", () => {
    describe("if user is not login", () => {
      it("should return 403, request forbidden", async () => {
        const { statusCode } = await supertest(app)
          .put(`/products/${productPayload.product_id}`)
          .send(updateProductPayload);
        expect(statusCode).toBe(403);
      });
    });
    describe("if user is login", () => {
      describe("if user is regular", () => {
        it("should return 403, request forbidden", async () => {
          const { body } = await supertest(app)
            .post("/auth/login")
            .send(userRegular);

          const updatedData = await supertest(app)
            .put(`/products/${productPayload.product_id}`)
            .set("Authorization", `${body.data.accessToken}`)
            .send(updateProductPayload);
          expect(updatedData.body.data.size).toBe(updateProductPayload.size);
        });
      });
      describe("if user is admin", () => {
        describe("the product doesn't exist", () => {
          it("should return error 404", async () => {
            const { body } = await supertest(app)
              .post("/auth/login")
              .send(userAdmin);

            const productId = "incorrect";
            await supertest(app)
              .put(`/products/${productId}`)
              .set("Authorization", `${body.data.accessToken}`)
              .send(updateProductPayload)
              .expect(404);
          });
        });
        it("should return 200, success update product", async () => {
          const { body } = await supertest(app)
            .post("/auth/login")
            .send(userAdmin);

          const updatedData = await supertest(app)
            .put(`/products/${productPayload.product_id}`)
            .set("Authorization", `${body.data.accessToken}`)
            .send(updateProductPayload);
          expect(updatedData.body.data.size).toBe(updateProductPayload.size);
        });
      });
    });
  });

  describe("delete product", () => {
    describe("the product doesn't exist", () => {
      it("should return error 404", async () => {
        const { body } = await supertest(app)
          .post("/auth/login")
          .send(userAdmin);

        const productId = "incorrect";
        await supertest(app)
          .delete(`/products/${productId}`)
          .set("Authorization", `${body.data.accessToken}`)
          .expect(404);
      });
    });
    describe("if user is not login", () => {
      it("should return 403, request forbidden", async () => {
        const { statusCode } = await supertest(app).delete(
          `/products/${productPayload.product_id}`,
        );
        expect(statusCode).toBe(403);
      });
    });
    describe("if user is login", () => {
      describe("if user is regular", () => {
        it("should return 403, request forbidden", async () => {
          const { body } = await supertest(app)
            .post("/auth/login")
            .send(userRegular);

          const { statusCode } = await supertest(app)
            .delete(`/products/${productPayload.product_id}`)
            .set("Authorization", `${body.data.accessToken}`)
            .send(createProductPayload);
          expect(statusCode).toBe(403);
        });
      });
      describe("if user is admin", () => {
        it("should return 200, success delete product", async () => {
          const { body } = await supertest(app)
            .post("/auth/login")
            .send(userAdmin);

          const { statusCode } = await supertest(app)
            .delete(`/products/${productPayload.product_id}`)
            .set("Authorization", `${body.data.accessToken}`)
            .send(createProductPayload);
          expect(statusCode).toBe(200);
        });
      });
    });
  });
});
