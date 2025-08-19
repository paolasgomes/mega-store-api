import { Router } from "express";
import { index } from "../controllers";

const authRouter = Router();

authRouter.post("/", index);

export { authRouter };
