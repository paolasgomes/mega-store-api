import { Router } from "express";
import { create } from "../controllers/create";

const usersRouter = Router();

usersRouter.post("/", create);

export { usersRouter };
