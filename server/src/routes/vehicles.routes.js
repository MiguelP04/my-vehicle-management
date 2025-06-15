import express from "express";
import {
  createVehicle,
  deleteVehicle,
  getAllVehicles,
  getVehicle,
  updateVehicle,
} from "../controller/vehicles.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {
  createVehicleSchema,
  updateVehicleSchema,
} from "../schemas/vehicle.schema.js";

const router = express.Router();

router.get("/", getAllVehicles);

router.post("/", validateSchema(createVehicleSchema), createVehicle);

router.get("/:id", getVehicle);

router.put("/:id", validateSchema(updateVehicleSchema), updateVehicle);

router.delete("/:id", deleteVehicle);

export default router;
