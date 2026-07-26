import { z } from "zod";

export const createItemListaSchema = z.object({
    listaId: z.number().int().positive("listaId debe ser un numero positivo"),
    productoId: z.number().int().positive("productoId debe ser un numero positivo"),
    cantidad: z.number().int().positive("La cantidad debe ser mayor a 0"),
    precio_unitario: z.number().nonnegative("El precio no puede ser negativo")
});

export const updateItemListaSchema = z.object({
    cantidad: z.number().int().positive("La cantidad debe ser mayor a 0"),
    precio_unitario: z.number().nonnegative("El precio no puede ser negativo")
});
