const config = {
  database: Bun.env.DATABASE,
  port: Bun.env.PORT,
  jwt_public: `${Bun.env.JWT_PUBLIC}`,
  jwt_private: `${Bun.env.JWT_PRIVATE}`,
};

export default config;
