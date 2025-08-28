import { Router } from "express";
import { create } from "../controllers/create";
import { update } from "../controllers/update";
import { verifyToken } from "../../auth/middlewares/protect-routes";
import { getById } from "../controllers/get-by-id";

const usersRouter = Router();

usersRouter.post("/", create);

usersRouter.patch("/:id", verifyToken, update);

usersRouter.get("/:id", verifyToken, getById);

export { usersRouter };
