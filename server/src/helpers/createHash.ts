import bcrypt from "bcrypt";

const createHash = async (password: string | Buffer, saltRounds: number) => {
  return await bcrypt.hash(password, saltRounds);
};

export default createHash;
