import config from "config";
import mongoose from "mongoose";
const MONGOURL = config.get<string>("MONGOURL");
const connect = async () => {
  try {
    await mongoose.connect(MONGOURL);
    console.log("DB connected 🥂");
  } catch (error) {
    console.error((error as Error).message);
  }
};
export default connect;
