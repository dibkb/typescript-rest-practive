import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "config";
import router from "./router";
import connect from "./utlis/connect";
// ================================================
const PORT = config.get<number>("port");
const app = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
const server = http.createServer(app);
server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT} 🚀`);
  await connect();
});
app.use("/", router());
