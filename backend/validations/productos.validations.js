import { z } from "zod";

export const ProductosSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio").max(100, "Maximo 100 caracteres")
});