import z from "zod";

export const createAssignmentSchema = z
  .object({
    vehicleId: z.number().int().positive().min(1, {
      message: "vehicleId is required and must be a positive integer",
    }),
    userId: z
      .number()
      .int()
      .positive()
      .min(1, { message: "userId is required and must be a positive integer" }),
    assignmentDate: z
      .string()
      .nonempty({ message: "AssignmentDate is required" })
      .datetime({ message: "assignmentDate must be a valid date and time" }),
    deliveryDate: z
      .string()
      .nonempty({ message: "deliveryDate is required" })
      .datetime({ message: "deliveryDate must be a valid date and time" }),
  })
  .refine(
    (data) => new Date(data.assignmentDate) <= new Date(data.deliveryDate),
    {
      message: "Assignment date cannot be after delivery date",
    }
  );
