import { Router } from "express";
import { login } from "../controller/user.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { loginSchema } from "../validations/user.validations.js";

const router = Router();

router.post("/login", validate(loginSchema), login);

export default router;
