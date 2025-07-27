import express from "express";
import {
  createVehicle,
  deleteVehicle,
  getAllVehicles,
  getVehicle,
  updateVehicle,
  getOwner,
  getVehicleHistory,
} from "../controller/vehicles.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createVehicleSchema,
  updateVehicleSchema,
} from "../schemas/vehicle.schema.js";

const router = express.Router();

router.get("/", getAllVehicles);

router.get("/:id", getVehicle);

router.get("/:id/history", getVehicleHistory);

router.get("/owner/:id", getOwner);

router.post(
  "/",
  upload.single("image"),
  validateSchema(createVehicleSchema),
  createVehicle
);

router.put(
  "/:id",
  upload.single("image"),
  validateSchema(updateVehicleSchema),
  updateVehicle
);

router.patch(
  "/:id",
  upload.single("image"),
  validateSchema(updateVehicleSchema),
  updateVehicle
);

router.delete("/:id", deleteVehicle);

export default router;
