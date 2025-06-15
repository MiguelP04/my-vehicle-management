import express from "express";

import {
  createAssignment,
  getAllAssignments,
  deleteAssignments,
} from "../controller/assignments.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createAssignmentSchema } from "../schemas/assignment.schema.js";

const router = express.Router();

router.get("/", getAllAssignments);
router.post("/", validateSchema(createAssignmentSchema), createAssignment);
router.delete("/:id", deleteAssignments);

export default router;
