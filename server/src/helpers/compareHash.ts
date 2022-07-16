import bcrypt from "bcrypt";

const compareHash = (
  password: string,
  user_password: string
): Promise<boolean> => {
  return bcrypt.compare(password, user_password);
};

export default compareHash;
