import express from "express";

import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserAssignments,
  getUserVehicleHistory,
} from "../controller/users.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema.js";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/assignments", getUserAssignments);

router.get("/:id", getUser);

router.get("/:id/history", getUserVehicleHistory);

router.post(
  "/",
  upload.single("image"),
  validateSchema(createUserSchema),
  createUser
);

router.put(
  "/:id",
  upload.single("image"),
  validateSchema(updateUserSchema),
  updateUser
);

router.delete("/:id", deleteUser);

export default router;
