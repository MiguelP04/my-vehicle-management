import z from "zod";

export const createAssignmentSchema = z.object({
  vehicle_id: z
    .number({
      required_error: "vehicleId is required",
      invalid_type_error: "vehicleId must be a number",
    })
    .int()
    .positive(),

  user_id: z
    .number({
      required_error: "userId is required",
      invalid_type_error: "userId must be a number",
    })
    .int()
    .positive(),
});

export const assignmentIdSchema = z.object({
  assignment_id: z.string().refine((val) => !isNaN(parseInt(val)), {
    message: "assignmentId must be a valid number",
  }),
});
