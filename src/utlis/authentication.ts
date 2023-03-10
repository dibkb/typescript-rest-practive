import config from "config";
import bcrypt from "bcrypt";
const authentication = async (password: string) => {
  const salt = await bcrypt.genSalt(config.get<number>("saltRounds"));
  const hash = await bcrypt.hashSync(password, salt);
  return hash;
};
export default authentication;
