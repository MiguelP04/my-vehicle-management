import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import vehiclesRoutes from "./routes/vehicles.routes.js";
import usersRoutes from "./routes/users.routes.js";
import assignmentsRoutes from "./routes/assignments.routes.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/vehicles", vehiclesRoutes);
app.use("/users", usersRoutes);
app.use("/assignments", assignmentsRoutes);
app.get("/debug/list-images", (req, res) => {
  const uploadsPath = path.join(__dirname, "..", "uploads");
  fs.readdir(uploadsPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "No se pudo leer la carpeta" });
    }
    res.json({ files });
  });
});
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

export default app;
