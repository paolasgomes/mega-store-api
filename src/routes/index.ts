import { verifyToken } from "../modules/auth/middlewares/protect-routes";
import { authRouter } from "../modules/auth/routes";
import { usersRouter } from "../modules/users/routes/index";
import { Router } from "express";

const routes = Router();

routes.use("/users", usersRouter);

routes.use("/login", authRouter);

//Protected Routes

export { routes };
