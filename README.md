# REST API Express TypeScript

REST API sederhana menggunakan Express.js, TypeScript, MongoDB, JWT, dan Bun.

## Features

- Authentication user
- JWT access token dan refresh token
- Middleware deserialize token
- CRUD Product
- MongoDB connection
- Request body parser
- CORS
- Logger menggunakan Pino
- Request validation menggunakan Joi

## Tech Stack

- **Runtime:** Bun
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT (RS256)
- **Password Hashing:** Bun Password Hashing
- **Logger:** Pino Logger
- **Validation:** Joi

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

## Environment Variables

Buat file `.env` di root project lalu isi:

```env
DATABASE=your_mongodb_connection_string

PORT=4000

JWT_PUBLIC=your_jwt_public_key

JWT_PRIVATE=your_jwt_private_key
```

## How to Run

### Development

Menjalankan server dalam mode development dengan auto reload:

```bash
bun run dev
```

Server akan berjalan pada:

```txt
http://localhost:4000
```

### Check TypeScript

Memeriksa error TypeScript tanpa melakukan build:

```bash
bun run check-types
```

### Build

Build project ke folder `dist`:

```bash
bun run build
```

### Production

Menjalankan hasil build:

```bash
bun run start
```

## API Endpoints

### Authentication

#### Register User

```http
POST /api/users
```

#### Login User

```http
POST /api/users/login
```

#### Refresh Access Token

```http
POST /api/users/refresh-token
```

### Products

#### Get All Products

```http
GET /api/products
```

#### Get Product By ID

```http
GET /api/products/:id
```

#### Create Product

```http
POST /api/products
```

#### Update Product

```http
PUT /api/products/:id
```

#### Delete Product

```http
DELETE /api/products/:id
```

## Project Structure

```txt
src
├── middleware
├── model
├── routes
├── utils
├── validation
├── app.ts
└── index.ts
```

## Scripts

```bash
bun run dev
```

Menjalankan development server.

```bash
bun run build
```

Build project ke folder dist.

```bash
bun run start
```

Menjalankan hasil build.

```bash
bun run check-types
```

Memeriksa error TypeScript.

## Author

**Raihan Daniswara**

GitHub:
https://github.com/raihan-daniswara