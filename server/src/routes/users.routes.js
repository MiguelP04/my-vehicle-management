import express from "express";

import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/users.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema.js";

const router = express.Router();

router.get("/", getAllUsers);

router.post("/", validateSchema(createUserSchema), createUser);

router.get("/:id", getUser);

router.put("/:id", validateSchema(updateUserSchema), updateUser);

router.delete("/:id", deleteUser);

export default router;
