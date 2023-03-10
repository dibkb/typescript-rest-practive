import config from "config";
import bcrypt from "bcrypt";
export const encrypt = async (password: string) => {
  const salt = await bcrypt.genSalt(config.get<number>("saltRounds"));
  const hash = await bcrypt.hashSync(password, salt);
  return hash;
};
export const checkPassword = async (
  plainPassword: string,
  encryptedPassword: string
) => {
  return await bcrypt.compare(plainPassword, encryptedPassword);
};
