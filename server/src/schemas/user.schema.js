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
  age: z.coerce
    .number({
      required_error: "Age is required",
    })
    .int()
    .min(18, {
      message: "You must be at least 18 years old",
    }),
  phone_number: z
    .string({
      required_error: "Phone number is required",
    })
    .min(10, {
      message: "Phone number must be at leat 10 digits",
    })
    .max(15, {
      message: "Phone number must be a maximum of 15 digits",
    }),
});

export const updateUserSchema = createUserSchema.partial();
