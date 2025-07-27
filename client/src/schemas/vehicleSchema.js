import { z } from "zod";

const currentYear = new Date().getFullYear();

export const vehicleSchema = z.object({
  brand: z
    .string()
    .min(2, "La marca es obligatoria")
    .transform((val) => val.trim()),
  model: z
    .string()
    .min(2, "El modelo es obligatorio")
    .transform((val) => val.trim()),
  registration: z
    .string()
    .min(6, "La matrícula es obligatoria")
    .regex(/^[A-Z0-9]+$/, "Solo letras y números en mayúsculas")
    .transform((val) => val.trim().toUpperCase()),
  year: z.preprocess(
    (val) => {
      const parsed = Number(val);
      return val === "" || Number.isNaN(parsed) ? undefined : parsed;
    },
    z
      .number({
        required_error: "El año es obligatorio",
        invalid_type_error: "El año es obligatorio",
      })
      .int("Debe ser un número entero")
      .gte(1950, "El año debe ser mayor o igual a 1950")
      .lte(currentYear, `El año no puede ser mayor a ${currentYear}`)
  ),
  state: z.enum(["Disponible", "En mantenimiento"], {
    errorMap: () => ({ message: "Selecciona un estado válido" }),
  }),
});
