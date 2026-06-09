# REST API Express TypeScript

<p>
  <img src="https://img.shields.io/badge/Bun-1.3.14-black?logo=bun" alt="Bun" />
  <img src="https://img.shields.io/badge/TypeScript-6.0.3-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Express-5.2.1-black?logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-ODM-red" alt="Mongoose" />
  <img src="https://img.shields.io/badge/JWT-RS256-purple?logo=jsonwebtokens" alt="JWT" />
  <img src="https://img.shields.io/badge/Joi-Validation-orange" alt="Joi" />
  <img src="https://img.shields.io/badge/Test-Bun%20Test%20%2B%20Supertest-success" alt="Test" />
</p>

REST API sederhana menggunakan **Express.js**, **TypeScript**, **MongoDB**, **JWT**, dan **Bun**.
Project ini dibuat untuk mempelajari pembuatan REST API modern dengan authentication, authorization, CRUD product, validation, logging, dan testing.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Environment Variables](#environment-variables)
* [Available Scripts](#available-scripts)
* [API Endpoints](#api-endpoints)
* [Testing Coverage](#testing-coverage)
* [Project Structure](#project-structure)
* [Author](#author)

---

## Features

### Authentication

* User Registration
* User Login
* Access Token menggunakan JWT
* Refresh Token
* Role-based Authorization
* Admin dan Regular User
* Password Hashing menggunakan Bun Password API

### Product Management

* Create Product
* Get All Products
* Get Product By ID
* Update Product
* Delete Product

### Validation & Security

* Request Validation menggunakan Joi
* JWT Authentication Middleware
* Deserialize Token Middleware
* Protected Routes
* Role Authorization Middleware

### Logging

* Pino Logger
* Error Logging
* Request Logging

### Testing

* Bun Test
* Supertest
* MongoDB Memory Server
* Integration Testing

---

## Tech Stack

| Category       | Technology           |
| -------------- | -------------------- |
| Runtime        | Bun                  |
| Language       | TypeScript           |
| Framework      | Express.js           |
| Database       | MongoDB              |
| ODM            | Mongoose             |
| Authentication | JWT RS256            |
| Validation     | Joi                  |
| Logger         | Pino                 |
| Testing        | Bun Test + Supertest |
| UUID           | UUID v7              |

---

## Installation

Clone repository:

```bash
git clone https://github.com/raihan-daniswara/belajar-rest-api-express-typescript.git
```

Masuk ke folder project:

```bash
cd belajar-rest-api-express-typescript
```

Install dependencies:

```bash
bun install
```

---

## Environment Variables

Buat file `.env` di root project:

```env
DATABASE=your_mongodb_connection_string

PORT=4000

JWT_PUBLIC=your_jwt_public_key

JWT_PRIVATE=your_jwt_private_key
```

Contoh struktur file:

```txt
rest-api/
├── src/
├── .env
├── package.json
└── README.md
```

---

## Available Scripts

### Development

Menjalankan server development dengan hot reload.

```bash
bun run dev
```

Server akan berjalan di:

```txt
http://localhost:4000
```

### Build

Build project ke folder `dist`.

```bash
bun run build
```

### Production

Menjalankan hasil build.

```bash
bun run start
```

### Type Checking

Memeriksa error TypeScript tanpa melakukan build.

```bash
bun run check-types
```

### Format Code

Merapikan kode menggunakan Prettier.

```bash
bun run format
```

### Testing

Menjalankan seluruh test.

```bash
bun run test
```

Menjalankan test dalam watch mode.

```bash
bun run test:watch
```

---

## API Endpoints

Base URL lokal:

```txt
http://localhost:4000
```

### Authorization Header

Untuk endpoint yang membutuhkan login, kirim access token melalui header:

```http
Authorization: <access_token>
```

Contoh:

```http
Authorization: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Authentication

### Register User

Mendaftarkan user baru.

```http
POST /auth/register
```

Body:

```json
{
  "email": "user@example.com",
  "name": "Raihan Daniswara",
  "password": "123123",
  "role": "regular"
}
```

Keterangan:

| Field    | Type   | Required | Description                  |
| -------- | ------ | -------- | ---------------------------- |
| email    | string | yes      | Email user                   |
| name     | string | yes      | Nama user                    |
| password | string | yes      | Password user                |
| role     | string | no       | Role user, default `regular` |

---

### Login User

Login user dan mendapatkan access token serta refresh token.

```http
POST /auth/login
```

Body:

```json
{
  "email": "user@example.com",
  "password": "123123"
}
```

Keterangan:

| Field    | Type   | Required | Description   |
| -------- | ------ | -------- | ------------- |
| email    | string | yes      | Email user    |
| password | string | yes      | Password user |

---

### Refresh Token

Membuat access token baru menggunakan refresh token.

```http
POST /auth/refresh-token
```

Body:

```json
{
  "refreshToken": "your_refresh_token"
}
```

Keterangan:

| Field        | Type   | Required | Description              |
| ------------ | ------ | -------- | ------------------------ |
| refreshToken | string | yes      | Refresh token dari login |

---

## Products

### Get All Products

Mengambil semua data product.

```http
GET /products
```

Body:

```txt
-
```

---

### Get Product By ID

Mengambil detail product berdasarkan `product_id`.

```http
GET /products/:id
```

Contoh:

```http
GET /products/019eacfa-a352-71c8-96f3-55873ec99a77
```

Body:

```txt
-
```

---

### Create Product

Membuat product baru. Endpoint ini membutuhkan user login.

```http
POST /products
```

Headers:

```http
Authorization: <access_token>
```

Body:

```json
{
  "product_id": "019eacfa-a352-71c8-96f3-55873ec99a77",
  "name": "Hoodie Ready or Not",
  "price": 150000,
  "size": "M"
}
```

Keterangan:

| Field      | Type   | Required | Description     |
| ---------- | ------ | -------- | --------------- |
| product_id | string | yes      | ID unik product |
| name       | string | yes      | Nama product    |
| price      | number | yes      | Harga product   |
| size       | string | yes      | Ukuran product  |

---

### Update Product

Mengubah data product berdasarkan `product_id`. Endpoint ini membutuhkan user login.

```http
PUT /products/:id
```

Headers:

```http
Authorization: <access_token>
```

Body:

```json
{
  "price": 200000,
  "size": "XXL"
}
```

Keterangan:

| Field | Type   | Required | Description    |
| ----- | ------ | -------- | -------------- |
| name  | string | no       | Nama product   |
| price | number | no       | Harga product  |
| size  | string | no       | Ukuran product |

---

### Delete Product

Menghapus product berdasarkan `product_id`. Endpoint ini membutuhkan login dan role `admin`.

```http
DELETE /products/:id
```

Headers:

```http
Authorization: <access_token>
```

Body:

```txt
-
```

---

## Testing Coverage

### Auth

* Register User
* Login User
* Refresh Token
* Invalid Credentials

### Product

* Get All Products
* Get Product By ID
* Create Product
* Update Product
* Delete Product
* Unauthorized Access
* Forbidden Access
* Product Not Found

---

## Project Structure

```txt
src
├── __tests__
├── config
├── controllers
├── middleware
├── models
├── routes
├── services
├── types
├── utils
├── validation
└── index.ts
```

---

## Author

**Raihan Daniswara**

GitHub:
https://github.com/raihan-daniswara
