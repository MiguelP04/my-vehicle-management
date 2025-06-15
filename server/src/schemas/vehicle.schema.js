import z from "zod";

export const createVehicleSchema = z.object({
  brand: z
    .string({
      required_error: "Brand is required",
    })
    .min(2, {
      message: "Brand must be at least 2 characters long",
    }),
  model: z
    .string({
      required_error: "Model is required",
    })
    .min(1, {
      message: "Model must be at least 1 character long",
    }),
  year: z
    .number({
      required_error: "Year is required",
    })
    .int()
    .min(1900, {
      message: "Year must be a valid year (after 1900)",
    }),
  registration: z
    .string({
      required_error: "Registration is required",
    })
    .min(6, {
      message: "Registration must be at least 6 character long",
    })
    .max(7, {
      message: "Registration must be at most 7 characters long",
    })
    .regex(/^[A-Z0-9]+$/, {
      message:
        "Registration must consist of uppercase letters and numbers only",
    }),
  state: z.enum(["Disponible", "En uso", "Mantenimiento"], {
    message: "State must be either 'Disponible' or 'En uso' or 'Mantenimiento'",
  }),
});

export const updateVehicleSchema = createVehicleSchema.partial();
