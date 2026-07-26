import { Router } from "express";
import { createItemLista, marcarComprado, updateItemLista, deleteItemLista } from "../controller/itemLista.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createItemListaSchema, updateItemListaSchema } from "../validations/itemLista.validations.js";

const router = Router();

router.post("/", validate(createItemListaSchema), createItemLista);
router.put("/:id/marcar", marcarComprado);
router.put("/:id", validate(updateItemListaSchema), updateItemLista);
router.delete("/:id", deleteItemLista);

export default router;
