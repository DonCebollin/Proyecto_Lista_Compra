import { Router } from "express";
import { createProductos, getProductos, updateProductos, deleteProducto } from "../controller/productos.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { ProductosSchema } from "../validations/productos.validations.js";

const router = Router();

router.post("/", validate(ProductosSchema), createProductos);
router.get("/", getProductos);
router.put("/:id", validate(ProductosSchema), updateProductos);
router.delete("/:id", deleteProducto);

export default router;
