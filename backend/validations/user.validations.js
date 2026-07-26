import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Email invalido"),
    password: z.string().min(1, "La contraseña es obligatoria")
});
