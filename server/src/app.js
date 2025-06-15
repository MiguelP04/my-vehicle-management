import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import vehiclesRoutes from "./routes/vehicles.routes.js";
import usersRoutes from "./routes/users.routes.js";
import assignmentsRoutes from "./routes/assignments.routes.js";

dotenv.config();

const app = express();

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

app.use("/vehicles", (err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.use("/users", (err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

export default app;
