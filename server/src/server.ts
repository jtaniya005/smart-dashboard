import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import testRoutes from "./routes/test.routes";
import leadRoutes from "./routes/lead.routes";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", testRoutes);
app.use(
"/api/leads",
leadRoutes
);
const PORT = process.env.PORT || 5000;

app.get("/", (_, res) => {
  res.send("API running");
});
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});