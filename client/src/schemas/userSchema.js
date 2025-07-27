import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre debe tener mínimo 3 caracteres",
  }),
  last_name: z.string().min(3, {
    message: "El apellido debe tener mínimo 3 caracteres",
  }),
  email: z.string().email({
    message: "Formato de correo eléctronico inválido",
  }),
  age: z.preprocess(
    (val) => {
      const parsed = Number(val);
      return val === "" || Number.isNaN(parsed) ? undefined : parsed;
    },
    z
      .number({
        required_error: "La edad es obligatoria",
        invalid_type_error: "La edad es obligatoria",
      })
      .int("Debe ser un número entero")
      .gte(10, "El año debe ser mayor o igual a 1950")
      .lte(100, "El año no puede ser mayor a 100")
  ),
  phone_number: z
    .string()
    .min(10, {
      message: "El número de teléfono debe tener al menos 10 dígitos",
    })
    .max(15, {
      message: "El número de teléfono debe tener un máximo de 15 dígitos",
    }),
});
