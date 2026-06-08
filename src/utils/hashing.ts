// encoding
export const hashPassword = async (password: string) => {
  return await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 10,
  });
};

export const checkPassword = async (password: string, userPassword: string) => {
  return await Bun.password.verify(password, userPassword, "bcrypt");
};
