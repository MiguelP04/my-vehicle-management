import express from "express";

import {
  createAssignment,
  getAllAssignments,
  deleteAssignments,
  updateAssignment,
} from "../controller/assignments.controller.js";
import {
  validateSchema,
  validateParams,
} from "../middlewares/validator.middleware.js";
import {
  assignmentIdSchema,
  createAssignmentSchema,
} from "../schemas/assignment.schema.js";

const router = express.Router();

router.get("/", getAllAssignments);
router.post("/", validateSchema(createAssignmentSchema), createAssignment);
router.put(
  "/:assignment_id",
  validateParams(assignmentIdSchema),
  updateAssignment
);
router.delete("/:id", deleteAssignments);

export default router;
