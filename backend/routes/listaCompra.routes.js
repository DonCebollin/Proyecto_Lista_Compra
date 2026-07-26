import { Router } from "express";
import { createListaCompra, getListaActiva, cerrarListaActiva, getHistorialListas, deleteListaCompra } from "../controller/listaCompra.controller.js";

const router = Router();

router.post("/", createListaCompra);
router.get("/activa", getListaActiva);
router.get("/historial", getHistorialListas);
router.put("/cerrar", cerrarListaActiva);
router.delete("/:id", deleteListaCompra);

export default router;
