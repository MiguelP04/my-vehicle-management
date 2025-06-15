import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, {
      message: "Name must be at least 3 characters long",
    }),
  last_name: z
    .string({
      required_error: "Last name is required",
    })
    .min(3, {
      message: "Last name must be at least 3 characters long",
    }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email format",
    }),
  age: z
    .number({
      required_error: "Age is required",
    })
    .min(18, {
      message: "You must be at least 18 years old",
    }),
});

export const updateUserSchema = createUserSchema.partial();
